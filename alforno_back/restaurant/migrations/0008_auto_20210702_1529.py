# Generated by Django 3.1.6 on 2021-07-02 13:29

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('restaurant', '0007_inforestaurant_prix_minimum'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Admin_account',
            new_name='AdminAccount',
        ),
    ]
