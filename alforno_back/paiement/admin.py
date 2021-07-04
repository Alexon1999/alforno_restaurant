from restaurant.models import PlatAuChoix
from django.contrib import admin

# Register your models here.
from .models import Panier, Commande, Client, ItemMenu, ItemProduit


class CommandeAdmin(admin.ModelAdmin):
    list_display = ('id', 'date_commande', 'panier', 'totale')


class PanierAdmin(admin.ModelAdmin):
    list_display = ('id', 'totale')


# admin.site.register(ItemMenu)
# admin.site.register(ItemProduit)
admin.site.register(Panier, PanierAdmin)
admin.site.register(Commande, CommandeAdmin)
admin.site.register(Client)
