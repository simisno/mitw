from    django.urls import  path

from    knox        import  views   as knox_views

from    .           import  views

urlpatterns = [
        path    ("auth/register"    , views.register                    , name= "register"      ,),
        path    ('auth/logout'      , knox_views.LogoutView.as_view()   , name= 'knox_login'    ,),
        path    ('auth/login'       , views.login                       , name= 'login'         ,),
        path    ('auth/user'        , views.user                        , name= 'user'          ,),
        path    ("search"           , views.search                      , name= "search"        ,),
    ]