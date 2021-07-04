from rest_framework import serializers
from restaurant.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {'password': {'write_only': True}}
        extra_kwargs = {"username": {"required": False, "allow_null": True}}
        #extra_kwargs = {"forgotKey": {"required": False, "allow_null": True}}

    def create(self, validated_data):
        user = User(**validated_data)
        user.save()
        return user

    def get_validation_exclusions(self):
        exclusions = super(UserSerializer, self).get_validation_exclusions()
        return exclusions + ['username']


class AdminAccountSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, required=False)

    class Meta:
        model = AdminAccount
        fields = [
            "id",
            "user",
        ]
        depth = 2

    def create(self, data, **kwargs):

        user_data = data['user']
        user = User.objects.create(
            username=user_data["username"],
        )
        user.set_password(user_data["password"])
        user.save()

        admin_account = AdminAccount.objects.create(
            user=user
        )
        admin_account.save()
        return admin_account

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        user = instance.user
        user.username = user_data.get('username', user.username)
        password = user_data.pop('password')
        user.set_password(password)
        user.save()

        return instance


class HoraireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Horaire
        fields = ["id",
                  "debut_apres_midi",
                  "fin_apres_midi",
                  "debut_soir",
                  "fin_soir"
                  ]


class InfoRestaurantSerializer(serializers.ModelSerializer):
    horaires = HoraireSerializer()

    class Meta:
        model = InfoRestaurant
        fields = ["id",
                  "ouvert",
                  "prix_livraison",
                  "prix_minimum",
                  "horaires"
                  ]


class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = ["id",
                  "nom",
                  "description",
                  ]


class CategorieNomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Categorie
        fields = [
            "nom",
        ]


class ProduitSerializer(serializers.ModelSerializer):
    categorie = CategorieSerializer()

    class Meta:
        model = Produit
        fields = ["id",
                  "nom",
                  "description",
                  "prix",
                  "ingredients",
                  "categorie",
                  "disponibilite",
                  "image_url",
                  ]


class ProduitSerializer_choix(serializers.ModelSerializer):
    class Meta:
        model = Produit
        fields = ["id",
                  "nom",
                  "disponibilite",
                  "image_url",
                  ]


class CategoriesChoixQuantiteSerializer(serializers.ModelSerializer):
    categorie = CategorieSerializer()

    class Meta:
        model = CategoriesChoixQuantite
        fields = [
            "quantite",
            "categorie",
        ]


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = [
            "id",
            "nom",
            "description",
        ]


class PlatAuChoixSerializer(serializers.ModelSerializer):
    categories = CategorieSerializer(many=True)

    class Meta:
        model = PlatAuChoix
        fields = [
            "id",
            "quantite",
            "categories",
        ]


class MenuSerializer(serializers.ModelSerializer):
    categories_choix = CategoriesChoixQuantiteSerializer(many=True)
    details_plat_au_choix = PlatAuChoixSerializer()

    class Meta:
        model = Menu
        fields = ["id",
                  "nom",
                  "description",
                  "image_url",
                  "prix",
                  "disponibilite",
                  "categories_choix",
                  "plat_au_choix",
                  "details_plat_au_choix"
                  ]


class FormulaireContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormulaireContact
        fields = ["id",
                  "nom",
                  "societe",
                  "telephone",
                  "email",
                  "message",
                  ]
