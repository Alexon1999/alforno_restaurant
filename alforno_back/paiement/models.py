from django.db import models
from django.db.models.enums import Choices
# Create your models here.
from functools import reduce


class ItemProduit(models.Model):
    nom = models.CharField(max_length=80)
    prix = models.FloatField(default=0, blank=True)
    quantite = models.IntegerField(default=0)

    def __str__(self):
        return str(self.nom)

    def totale(self):
        return round(self.prix * self.quantite, 2)


class ItemMenu(models.Model):
    nom = models.CharField(max_length=80)
    prix = models.FloatField(default=0, blank=True)
    quantite = models.IntegerField(default=0)
    composition = models.TextField(blank=True)

    def __str__(self):
        return str(self.nom)

    def totale(self):
        return round(self.prix * self.quantite, 2)


class Panier(models.Model):
    produits = models.ManyToManyField(ItemProduit, blank=True)
    menus = models.ManyToManyField(ItemMenu, blank=True)

    def __str__(self):
        return str(self.id)

    def totale(self):
        return round(reduce(lambda acc, item: acc + item.totale(), self.produits.all(), 0) + reduce(lambda acc, item: acc + item.totale(), self.menus.all(), 0), 2)


class Client(models.Model):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    email = models.EmailField()
    telephone = models.CharField(max_length=20)
    adresse = models.CharField(max_length=250)
    ville = models.CharField(max_length=32)
    code_postale = models.CharField(max_length=32, null=False)

    def __str__(self):
        return self.nom + ' ' + self.prenom


class Commande(models.Model):
    # code = models.CharField(
    #     max_length=5, default=generate_code,  blank=True, unique=True, null=True)
    date_commande = models.DateTimeField(auto_now_add=True)
    commentaire = models.TextField(null=True, blank=True)
    client = models.ForeignKey(Client, on_delete=models.SET_NULL, null=True)
    panier = models.ForeignKey(Panier, on_delete=models.CASCADE, null=True)
    prix_totale = models.FloatField(default=0.0)

    est_vue = models.BooleanField(default=False)
    est_livre = models.BooleanField(default=False)

    reference = models.CharField(
        default='', max_length=6, null=True)

    vente_choices = [
        ("Livraison", 'Livraison'),
        ("À emporter", 'À emporter'),
    ]

    methode_vente = models.CharField(
        max_length=10,
        choices=vente_choices,
        default="Livraison",
    )

    def __str__(self):
        return str(self.id)

    def totale(self):
        return self.panier.totale()
