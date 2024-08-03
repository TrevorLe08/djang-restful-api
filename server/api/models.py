from django.db import models

# All models.
class Book(models.Model):
    book_title = models.CharField(max_length=100)
    release_year = models.IntegerField()

    def __str__(self):
        return self.book_title
    
