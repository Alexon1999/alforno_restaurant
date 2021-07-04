from rest_framework import serializers
from .models import Commande, Panier, Client, ItemMenu, ItemProduit


class ItemProduitSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemProduit
        fields = ["id",
                  "nom",
                  "prix",
                  "quantite",
                  ]


class ItemMenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemMenu
        fields = ["id",
                  "nom",
                  "prix",
                  "quantite",
                  "composition",
                  ]


class PanierSerializer(serializers.ModelSerializer):
    menus = ItemMenuSerializer(many=True)
    produits = ItemProduitSerializer(many=True)

    class Meta:
        model = Panier
        fields = ["id",
                  "menus",
                  "produits"
                  ]


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ["id",
                  "nom",
                  "prenom",
                  "email",
                  "telephone",
                  "telephone",
                  "adresse",
                  "ville",
                  "code_postale",
                  ]


class CommandeSerializer(serializers.ModelSerializer):
    panier = PanierSerializer()
    client = ClientSerializer()

    class Meta:
        model = Commande
        fields = ["id",
                  "date_commande",
                  "panier",
                  "commentaire",
                  "client",
                  "prix_totale",
                  "est_vue",
                  "est_livre",
                  "reference",
                  "methode_vente"
                  ]

    # def create(self, validated_data):
    #     panier_data = validated_data.pop('panier')
    #     panier = Panier.objects.create(**panier_data)
    #     client_data = validated_data.pop('client')
    #     client = Client.objects.create(**client_data)
    #     commande = Commande.objects.create(
    #         **validated_data, panier=panier, client=client)
    #     return commande
