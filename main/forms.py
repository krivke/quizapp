from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError  
from django.contrib.auth import authenticate,login

from .models import Profile
User = get_user_model()

class UserRegisterForm(UserCreationForm):
    username = forms.CharField()
    #email = forms.CharField()
    password1 = forms.CharField(widget=forms.PasswordInput)
    password2 = forms.CharField(widget=forms.PasswordInput)


    def __init__(self,*args,**kwargs):
        super(UserRegisterForm,self).__init__(*args,**kwargs)
        self.fields["username"].widget.attrs.update({"autofocus":False})
        #del self.fields["email"]

    #mora bas se zvat username_clean
    def username_clean(self):
        username = self.cleaned_data["username"].lower()
        new_user = User.objects.filter(username =username)

        if new_user.count():
            raise ValidationError("User already exists!")
        return username


    
    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise ValidationError("Passwords don't match!")
        return password2


    #so u dont have to save in views.py - you can just call form.save()
    def save(self,commit = True):
        #here you call super of UserCreationForm which will do user.set_password for you
        #so u dont havbe to do something liek
        #user.password = ...
        user = super(UserRegisterForm,self).save(commit=False)
        user.username = self.cleaned_data['username']
        
        if commit:
            user.save()
        return user

class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)

    def save(self,request,commit=True):
        username = self.cleaned_data["username"]
        password = self.cleaned_data["password"]
        user = authenticate(username=username,password=password)

        if user:
            login(request,user)


class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ["token",]