from django.db import models
import string
import random


def generate_unique_code():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break
    
    return code


class Room(models.Model):
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    vote_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, a, b, c, *args, **kwargs):
        if c!= False:
            self.host = a
            self.guest_can_pause = b
            self.vote_to_skip = c
            super().save(*args, **kwargs)
        elif c == False:
            self.guest_can_pause = a
            self.vote_to_skip = b
            super().save(*args, **kwargs)