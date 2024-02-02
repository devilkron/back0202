** env_guide **

PORT = 

HWT_KEY =

---------

**api_service **

method          path                authen     params      body
POST            /auth/register         0         none        {username,password,confirmpassword,email}
POST            /auth/login            0         none        {username,password}
GET             /auth/me               1        none           none

-------------------

Notes

MVC (moudels,route+controller,view)