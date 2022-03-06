
from urllib import request
from django import template
from main.models import *
register = template.Library()


@register.simple_tag
def total_q(questions_dict,category,index,profile):
    index = str(index)
    
    solved_q = Question.objects.filter(profile=profile,token=profile.token,category=category,solved=True).count()
    all_q = questions_dict[index]["total_num_of_questions"]
    
    output = f"{solved_q}/{all_q}"

    return output


@register.simple_tag
def percentage(questions_dict,category,index,profile):
    index = str(index)
    
    solved_q = Question.objects.filter(profile=profile,token=profile.token,category=category,solved=True).count()
    all_q = questions_dict[index]["total_num_of_questions"]
    
    output = f"{round((solved_q/all_q)*100)}%"
    
    return output


@register.simple_tag
def pending_q(questions_dict,index):
    index = str(index)

    pending_q = questions_dict[index]["total_num_of_pending_questions"]

    return pending_q
