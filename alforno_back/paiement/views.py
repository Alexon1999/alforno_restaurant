import string
from random import choices
from django.shortcuts import render, get_object_or_404
from rest_framework import generics, serializers, status, permissions
from .serializers import ClientSerializer, CommandeSerializer, PanierSerializer
from .models import Commande, ItemMenu, ItemProduit, Panier, Client
from restaurant.models import Menu, Produit
from rest_framework.views import APIView
from rest_framework.response import Response
import stripe
from functools import reduce
from django.http import JsonResponse

# Create your views here.

# generics.ListAPIView: Concrete view for listing a queryset. #+ (GET)
# generics.RetrieveAPIView: Concrete view for retrieving a model instance. #+ (GET)
# generics.CreateAPIView: Concrete view for creating a model instance. #+ (POST)
# generics.ListCreateAPIView: Concrete view for listing a queryset or creating a model instance. #+ (GET, POST)
# generics.RetrieveUpdateDestroyAPIView: Concrete view for retrieving, updating or deleting a model instance #+ (GET,POST,DELETE)
# APIVIEW: all methods can be defined, only what we define will work

# permissions.IsAuthenticated: we should pass an Autorization header, the type is Bearer token

# mettre en variable d'environnement
stripe.api_key = "sk_test_51IIvIiJnUZH8vWLUYv5UyL8c1xsuic2ukC0MrsaidKHLcroUAcLv9CE8Ufihgy1oHsNkag9GGQBYGkcNk7RI24Kr006AGZODjU"


class CreateClientSecret(APIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

    def post(self, request):
        try:
            paymentIntent = stripe.PaymentIntent.create(
                amount=request.data.get('amount', 0),
                currency='eur', receipt_email=request.data.get('email')
            )
            return Response({"clientSecret": paymentIntent['client_secret']})
        except Exception as e:
            return Response({"error": str(e)})


class ListStripeTransactions(APIView):
    permission_classes = [permissions.IsAuthenticated, ]

    def post(self, request, *args, **kwargs):
        try:
            print(request.data.get('date'))
            transactions = stripe.BalanceTransaction.list(
                created=request.data.get('date'))

            def calcul_prix_avec_frais(item):
                frais_stripe = item.fee
                # prix_en_usd = (item.amount - frais_stripe ) / 100
                prix_en_usd = (item.amount) / 100
                prix_euros = round(prix_en_usd / item.exchange_rate, 2)
                print(prix_euros)
                return prix_euros

            amount = reduce(lambda acc, item: acc + calcul_prix_avec_frais(item),
                            transactions.data, 0)
            nb_commandes = len(transactions['data'])
            return Response({"amount": amount,
                             "nb_commandes": nb_commandes,
                             #  "transactions": transactions
                             })
        except Exception as e:
            return Response({"error": str(e)})


class CommandeView(generics.ListAPIView):
    queryset = Commande.objects.all()
    serializer_class = CommandeSerializer
    permission_classes = [permissions.IsAuthenticated, ]

# class CommandeCreateView(generics.ListCreateAPIView):
#     queryset = Commande.objects.all()
#     serializer_class = CommandeSerializer


class CommandeDetailView(generics.RetrieveAPIView):
    queryset = Commande.objects.all()
    serializer_class = CommandeSerializer
    permission_classes = [permissions.IsAuthenticated, ]


class PanierView(generics.ListAPIView):
    queryset = Panier.objects.all()
    serializer_class = PanierSerializer
    permission_classes = [permissions.IsAuthenticated, ]


class NouvelleCommande(generics.ListAPIView):
    queryset = Commande.objects.filter(est_vue=False, est_livre=False)
    serializer_class = CommandeSerializer
    permission_classes = [permissions.IsAuthenticated, ]


def getNombreNouvellesCommandes(request):
    return JsonResponse({"length": Commande.objects.filter(est_vue=False, est_livre=False).count()})


class CommandeEnCours(generics.ListAPIView):
    queryset = Commande.objects.filter(est_vue=True, est_livre=False)
    serializer_class = CommandeSerializer
    permission_classes = [permissions.IsAuthenticated, ]


class HistoriqueCommande(generics.ListAPIView):
    queryset = Commande.objects.filter(
        est_vue=True, est_livre=True).order_by('-date_commande')
    serializer_class = CommandeSerializer
    permission_classes = [permissions.IsAuthenticated, ]


class CommandeCreateView(APIView):
    serializer_class = CommandeSerializer

    def post(self, request, format=None):
        panier = Panier()
        panier.save()  # il faut un id pour les relation many to many

        menus = request.data.get('panier').get('menus')
        if menus != None:
            for menu_dict in menus:
                menu = ItemMenu(
                    **menu_dict)
                menu.save()
                panier.menus.add(menu)

        produits = request.data.get('panier').get('produits')
        if produits != None:
            for produit_dict in produits:
                produit = ItemProduit(
                    **produit_dict)
                produit.save()
                panier.produits.add(produit)

        # print(panier.menus.all())

        client = Client.objects.create(**request.data.get('client'))

        while True:
            code = ''.join(
                choices(string.ascii_uppercase + '0123456789', k=6))
            if Commande.objects.filter(reference=code).count() == 0:
                break

        commande = Commande.objects.create(
            panier=panier, client=client, commentaire=request.data.get('commentaire'), prix_totale=request.data.get('prix_totale'), reference=code, methode_vente=request.data.get("methode_vente"))

        return Response(self.serializer_class(commande).data, status=status.HTTP_201_CREATED)


class UpdateCommande(APIView):
    serializer_class = CommandeSerializer
    permission_classes = [permissions.IsAuthenticated, ]

    def put(self, request):
        commande_id = request.data.get('id')
        commande = get_object_or_404(Commande, id=commande_id)
        commande.est_vue = request.data.get('est_vue', commande.est_vue)
        commande.est_livre = request.data.get('est_livre', commande.est_livre)
        commande.save(update_fields=['est_livre', 'est_vue'])
        return Response(status=status.HTTP_204_NO_CONTENT)
