from    django.conf     import  settings

from    tweepy.parsers  import  JSONParser

import  tweepy


AUTH = tweepy.OAuthHandler(settings.TWITTER_API_KEY, settings.TWITTER_API_SECRET)
AUTH.set_access_token(settings.TWITTER_ACCESS, settings.TWITTER_ACCESS_SECRET)

API = tweepy.API(AUTH, parser= JSONParser())

def extract_tweet   (
    #
            tweet   ,
        ):
    
    tweet_fields    = [
            "id_str"            ,
            "created_at"        ,
            "text"              ,
            "retweet_count"     ,
            "favorite_count"    ,
        ]
    user_fields     = [
            "id_str"            ,
            "name"              ,
            "screen_name"       ,
            "description"       ,
            "url"               ,
            "followers_count"   ,
            "friends_count"     ,
            "statuses_count"    ,

            "profile_image_url_https"   ,
            "profile_background_color"  ,
        ]
    if      "retweeted_status" in tweet.keys()  :
        tweet   = tweet["retweeted_status"]
    
    result          = {x: tweet[x]          for x in tweet_fields   }
    result["user"]  = {x: tweet["user"][x]  for x in user_fields    }
    return result
def g_tweet         (
    #
            tag ,
        ):
    lang        = tag["language"].lower() if tag["language"] != "ANY" else None
    result_type = tag["type_"].lower().replace("all","mixed")
    geocode     = None  if tag["radius"] == 0 else f'{tag["lat"]},{tag["lng"]},{int(tag["radius"])}km'
    query       = tag["tag"]                                                    +\
        (f' min_retweets:{tag["retweets"]}'   if tag["retweets"]  !=0 else "")  +\
        (f' min_faves:{tag["favorites"]}'     if tag["favorites"] !=0 else "")
    print(query)
    result  = API.search(
            query                           ,
            count       = tag["n_tweets"]   ,
            lang        = lang              ,
            result_type = result_type       ,
            geocode     = geocode           ,
            )
    result  = [extract_tweet(x) for x in result["statuses"]]

    for x in result :
        x.update(tag)
    
    return result
def g_tweets        (
    #
        tags    ,
        ):
    return [ y for x in [g_tweet(x) for x in tags] for y in x]