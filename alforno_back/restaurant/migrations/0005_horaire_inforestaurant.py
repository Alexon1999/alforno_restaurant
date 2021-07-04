# Generated by Django 3.1.6 on 2021-07-01 13:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0004_auto_20210630_0240'),
    ]

    operations = [
        migrations.CreateModel(
            name='Horaire',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('debut_apres_midi', models.FloatField(default=11.0)),
                ('fin_apres_midi', models.FloatField(default=15.0)),
                ('debut_soir', models.FloatField(default=18.0)),
                ('fin_soir', models.FloatField(default=22.3)),
            ],
        ),
        migrations.CreateModel(
            name='InfoRestaurant',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ouvert', models.BooleanField(default=True)),
                ('prix_livraison', models.FloatField(default=0)),
                ('horaires', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='restaurant.horaire')),
            ],
        ),
    ]
