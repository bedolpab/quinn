from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import StudentProfile
from .serializers import StudentProfileSerializer
from django.http import HttpResponse


@api_view(['POST'])
def register_student(request):
    serializer = StudentProfileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Student registered successfully!'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def home_view(request):
    return HttpResponse("Quinn Backend is Live 🚀")
