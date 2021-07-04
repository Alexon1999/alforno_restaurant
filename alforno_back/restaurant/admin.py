from django.contrib import admin
from restaurant.models import *


class ProduitAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom', 'prix', 'categorie', 'disponibilite')


class CategorieAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom')


class CategoriesChoixQuantiteAdmin(admin.ModelAdmin):
    list_display = ('id', 'categorie', 'quantite')


class MenuAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom', 'prix', 'get_categorie', 'disponibilite')


class AppartenirAuCategorieAdmin(admin.ModelAdmin):
    list_display = ('id', 'categorie', 'get_menus')


class PlatAuChoixAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_categories')


class InfoRestaurantAdmin(admin.ModelAdmin):
    list_display = ('id', 'ouvert', 'prix_livraison', 'get_horaires')


class FormulaireContactAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom', 'telephone', 'message')


# Register your models here.
admin.site.register(Categorie, CategorieAdmin)
admin.site.register(CategoriesChoixQuantite, CategoriesChoixQuantiteAdmin)
admin.site.register(Produit, ProduitAdmin)
admin.site.register(Menu, MenuAdmin)
admin.site.register(Ingredient)
admin.site.register(FormulaireContact, FormulaireContactAdmin)
admin.site.register(AppartenirAuCategorie, AppartenirAuCategorieAdmin)
admin.site.register(PlatAuChoix, PlatAuChoixAdmin)
admin.site.register(Horaire)
admin.site.register(InfoRestaurant, InfoRestaurantAdmin)


# admin.site.register(Ingredient_info)
