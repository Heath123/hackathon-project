from flask import Flask, render_template, request, redirect

app = Flask(__name__) 

@app.route("/login", methods=['GET','POST'])
def login():
    if request.method == "POST" and ((request.form["User"] == "Morgan") and (request.form["Pass"] == "TheDingle")):
        return redirect("/surprise", code = 302)
    return render_template("login.html")

@app.route("/register", methods=['GET','POST'])
def register():
    if request.method == "POST":
        username = request.form["User"]
        password = request.form["Pass"]
        email = request.form["Email"]
        print(username,password,email)
            
    return render_template("register.html")

@app.route("/surprise")
def surprise():
    return render_template("surprise.html")