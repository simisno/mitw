from    django.db   import  models
from    django.conf import  settings

GENDER  = (
        (0  ,'Female'   ),
        (1  ,'Male'     ),
        (2  ,'Other'    ),
    )

class Tweet         (
    #
            models.Model    ,
        ):
    tweet_id    = models.CharField      (
            unique      = True  ,
            max_length  = 50    ,
        )
    created_at  = models.DateTimeField  (
        )
    text        = models.TextField      (
        )
    n_replies   = models.IntegerField   (
        )
    n_retweet   = models.IntegerField   (
        )
    n_favorite  = models.IntegerField   (
        )
    language    = models.CharField      (
            max_length  = 50    ,
        )
    address     = models.CharField      (
            max_length  = 50    ,
        )
    url         = models.URLField       (
            unique  = True  ,
        )

    username    = models.CharField      (
            max_length  = 50    ,
            unique      = True  ,
        )
    screen_name = models.CharField      (
            max_length  = 50    ,
            unique      = True  ,
        )
    tweeter_id  = models.CharField      (
            max_length  = 50    ,
            unique      = True  ,
        )
    tweeter_url = models.URLField       (
            unique  = True  ,
        )
    
    user    = models.ForeignKey (
            settings.AUTH_USER_MODEL        ,
            on_delete   = models.CASCADE    ,
        )
    
class Profile       (
    #
            models.Model    ,
        ):
    avatar      = models.ImageField     (
            blank   = True  ,
            null    = True  ,
        )
    bio         = models.TextField      (
            blank   = True  ,
            null    = True  ,
        )
    gender      = models.IntegerField   (
            choices = GENDER    ,
        )
    location    = models.TextField      (
            blank   = True  ,
            null    = True  ,
        )
    website     = models.URLField       (
        )
    
    user    = models.ForeignKey (
            settings.AUTH_USER_MODEL        ,
            on_delete   = models.CASCADE    ,
        )
class TweeterUser   (
    #
            models.Model    ,
        ):
    username    = models.CharField      (
            max_length  = 50    ,
            unique      = True  ,
        )
    screen_name = models.CharField      (
            max_length  = 50    ,
            unique      = True  ,
        )
    tweeter_id  = models.CharField      (
            max_length  = 50    ,
            unique      = True  ,
        )
    url         = models.URLField       (
            unique  = True  ,
        )

    location    = models.TextField      (
        )
    image_url   = models.URLField       (
        )
    banner_url  = models.URLField       (
        )
    description = models.TextField      (
        )
    n_followers = models.IntegerField   (
        )
    n_tweets    = models.IntegerField   (
        )
