from    django.contrib.auth.models  import  User
from    django.contrib.auth         import  authenticate

from    rest_framework              import  serializers

from    .models                     import  *

class UserSerializer        (
    #
            serializers.ModelSerializer ,
        ):
    class Meta  :
        model   = User
        fields  = [
                "id"        ,
                "username"  ,
                "email"     ,
            ]
class RegisterSerializer    (
    #
            serializers.ModelSerializer ,   
        ):
    class Meta  :
        model   = User
        fields  = [
                "username"  ,
                "email"     ,
                "password"  ,
            ]
        
        extra_kwargs    = {
                "password"  : {
                        "write_only"    : True  ,
                    },
            }
class LoginSerializer       (
    serializers.Serializer  ):
    username    = serializers.CharField()
    password    = serializers.CharField()

    def validate    (
        self    ,
        data    ):
        user    = authenticate(**data)
        if      user and user.is_active :
            return user
        raise   serializers.ValidationError('Incorrect Credentials')
class TagSerializer         (
    #
            serializers.Serializer  ,   
        ):
    id_         = serializers.CharField     (
            max_length  = 30    ,
        )
    tag         = serializers.CharField     (
            max_length  = 100   ,
        )
    color       = serializers.CharField     (
            max_length  = 30    ,
        )
    n_tweets    = serializers.IntegerField  (
        )
    lng         = serializers.FloatField    (
        )
    lat         = serializers.FloatField    (
        )
    radius      = serializers.FloatField    (
        )
    language    = serializers.CharField     (
            max_length  = 30    ,
        )
    type_       = serializers.CharField     (
            max_length  = 30    ,
        )
    retweets    = serializers.IntegerField  (
        )
    favorites   = serializers.IntegerField  (
        )