# Generated by Django 3.1.6 on 2021-06-30 15:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('paiement', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='commande',
            name='methode_vente',
            field=models.CharField(choices=[('Livraison', 'Livraison'), ('À emporter', 'À emporter')], default='Livraison', max_length=10),
        ),
    ]
