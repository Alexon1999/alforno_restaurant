# Generated by Django 3.1.6 on 2021-06-30 00:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0003_auto_20210630_0226'),
    ]

    operations = [
        migrations.RenameField(
            model_name='platauchoix',
            old_name='plat_au_choix_quantite',
            new_name='quantite',
        ),
    ]
