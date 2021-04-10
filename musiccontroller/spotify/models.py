from django.db import models

# Create your models here.

class SpotifyToken(models.Model):
    user = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=150)
    access_token = models.CharField(max_length=150)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=50)
    
    """
    def save(self, access=False, refresh=False, tokenType=False, expires=False, *args, **kwargs):
        if access != False:
            self.access_token = access

        if refresh != False:
            self.refresh_token = refresh
        
        if tokenType != False:
            self.token_type = tokenType
        
        if expires != False:
            self.expires_in = expires
            
        super().save(*args, **kwargs)
        """