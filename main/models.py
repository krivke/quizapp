from statistics import mode
from django.db import models
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.http import HttpResponseBadRequest
import requests

User = get_user_model()
# Create your models here.

class UnansweredQuestion(models.Model):
    pass

    

class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,null=True,blank=True)
    token = models.CharField(max_length=300,null=True,blank=True)
    def __str__(self):
        return self.user.username



class Question(models.Model):
    profile = models.ForeignKey(Profile,on_delete=models.CASCADE,null=True,blank=True)
    category = models.CharField(max_length=200,null=True,blank=True)
    text = models.TextField(null=True,blank=True)
    #correct_answer not chosen answer
    answer = models.CharField(max_length=200,null=True,blank=True)
    solved = models.BooleanField(default=False)
    #svakom pitanju moramo dodati token da znamo koji ga je token rijesio
    token = models.CharField(max_length=300,null=True,blank=True)
    

def getToken():
    URL = "https://opentdb.com/api_token.php?command=request"
    response = requests.get(URL).json()
    try:
        return response["token"]
    except:
        raise HttpResponseBadRequest("Bad req!")

@receiver(post_save, sender=User)
def save_profile(sender,created,instance, **kwargs):
    if created:
        token = getToken()
        Profile.objects.create(user=instance,token=token)
    

