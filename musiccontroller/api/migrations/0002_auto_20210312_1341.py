# Generated by Django 3.1.2 on 2021-03-12 18:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='room',
            old_name='geust_can_pause',
            new_name='guest_can_pause',
        ),
    ]
