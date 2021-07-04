from django.shortcuts import get_object_or_404, render
from rest_framework import generics, status, permissions
from .serializers import *
from .models import *

from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

# generics.ListAPIView: Concrete view for listing a queryset. #+ (GET)
# generics.RetrieveAPIView: Concrete view for retrieving a model instance. #+ (GET)
# generics.CreateAPIView: Concrete view for creating a model instance. #+ (POST)
# generics.ListCreateAPIView: Concrete view for listing a queryset or creating a model instance. #+ (GET, POST)
# generics.RetrieveUpdateDestroyAPIView: Concrete view for retrieving, updating or deleting a model instance #+ (GET,POST,DELETE)
# APIVIEW: all methods can be defined, only what we define will work

# permissions.IsAuthenticated: we should pass an Autorization header, the type is Bearer token


class InfoRestaurantView(generics.ListAPIView):
    queryset = InfoRestaurant.objects.all()
    serializer_class = InfoRestaurantSerializer


class InfoRestaurantDetailView(generics.RetrieveAPIView):
    queryset = InfoRestaurant.objects.all()
    serializer_class = InfoRestaurantSerializer


class InfoRestaurantUpdateOuverture(APIView):
    serializer_class = InfoRestaurantSerializer
    permission_classes = [permissions.IsAuthenticated, ]

    # seulement PUT Request va marcher

    def put(self, request):
        info_id = request.data.get('id')
        info = get_object_or_404(InfoRestaurant, id=info_id)
        info.ouvert = request.data.get('ouvert', info.ouvert)
        info.save(update_fields=['ouvert'])
        return Response(status=status.HTTP_204_NO_CONTENT)


class CategoriesView(generics.ListAPIView):
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer


class CategorieDetailView(generics.RetrieveAPIView):
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer


class ProduitView(generics.ListAPIView):
    queryset = Produit.objects.all()
    serializer_class = ProduitSerializer


class ProduitDetailsView(generics.RetrieveAPIView):
    queryset = Produit.objects.all()
    serializer_class = ProduitSerializer


class ProduitsParCategories(APIView):
    serializer_class = ProduitSerializer

    def post(self, request):
        produits = Produit.objects.filter(
            categorie__in=request.data.get('categories'))
        return Response(ProduitSerializer(produits, many=True).data)


# recuperer les produits par categories


class CategorieAuProduitsView(APIView):
    queryset = Produit.objects.all()
    serializer_class = ProduitSerializer

    def get(self, request, *args, **kwargs):
        categorie = Categorie.objects.get(pk=kwargs['id_categorie'])
        est_menu = False
        try:
            est_menu = True if AppartenirAuCategorie.objects.get(
                categorie=categorie) else False
        except AppartenirAuCategorie.DoesNotExist:
            est_menu = False

        # print(Menu.objects.all(), Menu.objects.all().count())

        if est_menu:
            return Response({'est_menu': True, 'data': MenuSerializer(AppartenirAuCategorie.objects.get(categorie=categorie).menus, many=True).data})

        # return Response(ProduitSerializer(Produit.objects.filter(categorie=kwargs['id_categorie']), many=True).data)
        return Response({'est_menu': False, 'data': ProduitSerializer(Produit.objects.filter(categorie=categorie), many=True).data})


class MenuView(APIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

    def get(self, request):
        return Response(MenuSerializer(Menu.objects.all(), many=True).data)


class MenuDetailsView(generics.RetrieveAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

    def get(self, request, *args, **kwargs):
        menu = Menu.objects.get(id=kwargs['pk'])
        produits = Produit.objects.filter(
            categorie__in=[i.categorie for i in menu.categories_choix.all()])
        return Response({**MenuSerializer(menu).data, "produits": ProduitSerializer(produits, many=True).data})


class UpdateProduitDisponibilte(APIView):
    serializer_class = ProduitSerializer
    permission_classes = [permissions.IsAuthenticated, ]

    def put(self, request):
        produit_id = request.data.get('id')
        produit = get_object_or_404(Produit, id=produit_id)
        produit.disponibilite = request.data.get(
            'disponibilite', produit.disponibilite)
        produit.save(update_fields=['disponibilite'])
        return Response(status=status.HTTP_204_NO_CONTENT)


class FormulaireContactView(generics.ListAPIView):
    serializer_class = FormulaireContactSerializer
    queryset = FormulaireContact.objects.all()
    permission_classes = [permissions.IsAuthenticated, ]


class FormaulaireContactCreateView(generics.CreateAPIView):
    serializer_class = FormulaireContactSerializer
    queryset = FormulaireContact.objects.all()
