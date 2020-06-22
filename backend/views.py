from    django.shortcuts        import  render

from    rest_framework.permissions  import  IsAuthenticated
from    rest_framework.decorators   import  api_view    , permission_classes
from    rest_framework.response     import  Response
from    rest_framework              import  status

from    knox.models             import  AuthToken 

from    .serializers            import  *
from    .twitter                import  g_tweets

@api_view           (
        ['POST']    ,
    )
def login           (
    #
            request ,
        ):
    serialized  = LoginSerializer(data= request.data)
    
    if      serialized.is_valid()   :
        user    = serialized.validated_data
        return  Response(
                {
                        'user'      : UserSerializer(user).data         ,
                        'token'     : AuthToken.objects.create(user)[1] ,
                    }
            )
    else                            :
        print(serialized.errors)
        return  Response    (
                "Bad request"                           ,
                status  = status.HTTP_400_BAD_REQUEST   ,
            )

@api_view           (
        ['GET'] ,
    )
def user            (
    #
            request ,
        ):
    return  Response(
                {
                        'user'      : UserSerializer(request.user).data ,
                    }
            )

@api_view           (
        ["POST"]    ,
    )
@permission_classes (
        [IsAuthenticated]
    )
def search          (
    #
            request ,
        ):
    serialized  = TagSerializer(data= request.data, many=True)
    if      serialized.is_valid()   :
        result  = g_tweets(serialized.validated_data)
        return Response     (
                result
            )
    else                            :
        return  Response    (
                "Bad request"                           ,
                status  = status.HTTP_400_BAD_REQUEST   ,
            )

@api_view           (
        ["POST"]    ,
    )
def register        (
    #
            request ,
        ):
    serialized  = RegisterSerializer(data= request.data)
    if      serialized.is_valid()   :
        user    = User.objects.create_user(**serialized.validated_data)
        user.set_password(serialized.validated_data["password"])
        user.save()
        
        return Response     (
                {
                        "user"  : UserSerializer(user).data             ,
                        "token" : AuthToken.objects.create(user)[1]     ,
                    }
            )
    else                            :
        return  Response    (
                "Missing or bad data"                   ,
                status  = status.HTTP_400_BAD_REQUEST   ,
            )