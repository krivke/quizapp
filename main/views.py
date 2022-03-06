
import json
from multiprocessing import context
from django.urls import reverse
from django.shortcuts import get_object_or_404, redirect, render
from django.http import Http404, JsonResponse
import requests
from django.contrib.auth import logout

from .models import Profile, Question,getToken
from django.contrib import messages
from django.contrib.auth.decorators import login_required

from .categories import (
                            CATEGORIES,
                            FULL_CATEGORIES_DICT,
                            NUMBER_OF_QUESTIONS_URL,
                            CATEGORIES_DICT,         
                            )
from .forms import UserRegisterForm,LoginForm


def home(request):
    register_form = UserRegisterForm(request.POST or None)
    login_form = LoginForm(request.POST or None)
    if register_form.is_valid():
        register_form.save()
        messages.success(request, 'Account has been successfully created!')
        register_form = UserRegisterForm()
    

    if login_form.is_valid():
        login_form.save(request)
        messages.success(request,"You have beend succesfully logged in!")
        login_form = LoginForm()
    #register_form = UserRegisterForm() - will cause no errors even though there are

    total_questions = requests.get(NUMBER_OF_QUESTIONS_URL).json()


    context = {
        "register_form":register_form,
        "login_form":login_form,
        "categories":CATEGORIES_DICT,
        "total_questions":total_questions["categories"],

    }
    return render(request,"main/home.html",context)


def logout_view(request):
    logout(request)
    return redirect(reverse("home"))

@login_required
def profile(request):

    if request.method == "POST":
        new_token = getToken()
        profile = get_object_or_404(Profile,user=request.user)
        profile.token = new_token
        profile.save()
    
    context  = {}
    return render(request,"main/profile.html",context)

@login_required
def settings(request):
    CATEGORIES_URL = "https://opentdb.com/api_category.php"
    categories = requests.get(CATEGORIES_URL).json()
    trivia_categories = categories["trivia_categories"]
    
    return render(request,"main/choose.html",{"categories":CATEGORIES,"cdict":trivia_categories})


def check_if_valid_url(category,difficulty,type,game_mode):
    categories_list = list(range(8,33))
    difficulty_list = ["hard","any","easy","medium"]
    type_list = ["multiple","boolean","any"]
    mode_list = ["solo","friends"]

    if  (category not in categories_list) or (difficulty not in difficulty_list) or \
        (type not in type_list) or (game_mode not in mode_list):
        return False
    return True


@login_required
def play(request,category,difficulty,type,game_mode):
    category = int(category)
    profile = get_object_or_404(Profile,user=request.user)
    print(profile.token)
    URL = f"https://opentdb.com/api.php?amount=1&token={profile.token}&encode=url3986"

    if not check_if_valid_url(category,difficulty,type,game_mode):
        raise Http404("Invalid URL!")

    #ANY = 8, while other categories are in range 9,32
    if category != 8:
        URL += f"&category={category}"
    if difficulty != "any":
        URL += f"&difficulty={difficulty}"
    if type != "any":
        URL += f"&type={type}"    
  
    wanted_category = FULL_CATEGORIES_DICT[category]
    
    context = {
        "category":wanted_category,
        "url":URL,    
    }
    print(URL)

    return render(request,"main/play.html",context)


def add_question(request):
    profile = get_object_or_404(Profile,user=request.user)
    data = json.loads(request.body)

    Question.objects.create(profile=profile,token=profile.token,**data)

    return JsonResponse("Added to a database!",safe=False)
