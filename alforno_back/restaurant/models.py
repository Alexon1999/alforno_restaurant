from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class AdminAccount(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)


class Ingredient(models.Model):
    nom = models.CharField(max_length=50)
    description = models.TextField(null=True)

    def __str__(self):
        return self.nom


class Categorie(models.Model):
    nom = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.nom


class Produit(models.Model):
    nom = models.CharField(max_length=50, unique=True)
    description = models.TextField(null=True, blank=True)
    categorie = models.ForeignKey(
        Categorie, null=True, on_delete=models.CASCADE, blank=True)  # Entrée Plats Dessert
    ingredients = models.ManyToManyField(Ingredient, blank=True)
    image_url = models.CharField(max_length=2048, null=True, blank=True)
    prix = models.FloatField(default=0, blank=True)
    disponibilite = models.BooleanField(default=False)

    def __str__(self):
        return self.nom


class CategoriesChoixQuantite(models.Model):
    categorie = models.ForeignKey(
        Categorie,  null=True, on_delete=models.SET_NULL, blank=True)
    quantite = models.IntegerField(default=0, null=True)

    def __str__(self):
        if self.categorie:
            return self.categorie.nom + " " + str(self.quantite)
        return str(self.quantite)


class PlatAuChoix(models.Model):
    quantite = models.IntegerField(
        null=True, default=0)
    categories = models.ManyToManyField(Categorie, blank=True)

    def get_categories(self):
        return ', '.join([i.nom for i in self.categories.all()])

    def __str__(self):
        return f'{self.get_categories()} {self.quantite}'


class Menu(models.Model):
    nom = models.CharField(max_length=80, unique=True)
    description = models.TextField(null=True, blank=True)
    image_url = models.CharField(max_length=2048, null=True, blank=True)
    prix = models.FloatField(default=0, blank=True)
    disponibilite = models.BooleanField(default=False)
    categories_choix = models.ManyToManyField(
        CategoriesChoixQuantite, blank=True)
    plat_au_choix = models.BooleanField(
        default=False)
    details_plat_au_choix = models.ForeignKey(
        PlatAuChoix, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.nom

    def get_categorie(self):
        return AppartenirAuCategorie.objects.get(menus__id=self.id).categorie.nom


class AppartenirAuCategorie(models.Model):
    categorie = models.ForeignKey(
        Categorie, null=True, on_delete=models.SET_NULL, blank=True)
    menus = models.ManyToManyField(Menu, blank=True)

    def get_menus(self):
        return ', '.join([i.nom for i in self.menus.all()])


class FormulaireContact(models.Model):
    nom = models.CharField(max_length=26)
    societe = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField()
    telephone = models.CharField(max_length=20)
    message = models.TextField()


class Horaire(models.Model):
    debut_apres_midi = models.FloatField(default=11.0)
    fin_apres_midi = models.FloatField(default=15.0)
    debut_soir = models.FloatField(default=18.0)
    fin_soir = models.FloatField(default=22.30)

    def __str__(self):
        return f'Après-Midi: {self.debut_apres_midi}-{self.fin_apres_midi} et Soir: {self.debut_soir}-{self.fin_soir}'


class InfoRestaurant(models.Model):
    ouvert = models.BooleanField(default=True)
    prix_livraison = models.FloatField(default=0)
    prix_minimum = models.FloatField(default=15)
    horaires = models.ForeignKey(
        Horaire, blank=True, null=True, on_delete=models.SET_NULL)

    def get_horaires(self):
        return self.horaires.__str__()
