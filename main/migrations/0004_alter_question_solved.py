# Generated by Django 3.2.11 on 2022-03-03 21:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_question'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='solved',
            field=models.BooleanField(default=1),
        ),
    ]
