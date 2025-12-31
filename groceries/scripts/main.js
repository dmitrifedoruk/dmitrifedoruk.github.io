// const supabase = window.supabase;
const supabaseUrl = "https://ozdhxwfawuxmpmvuyemh.supabase.co";
const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96ZGh4d2Zhd3V4bXBtdnV5ZW1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNjk3MDIsImV4cCI6MjA4MTc0NTcwMn0.p1mVp1e4D2dYd66qezoUZ_7STnpgA9oltSWFb9wFBHI";
const sup = supabase.createClient(supabaseUrl, supabaseAnonKey);


const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const loginSection = document.getElementById("login");
const listSection = document.getElementById("list");
const usernameSpan = document.getElementById("username");

signupBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    const { error } = await sup.auth.signUp({
        email: email,
        password: password,
    });
    if (error) {
        console.error("Error signing up:", error.message);
    } else {
        console.info("Sign up successful! Please check your email to confirm.");
    }
});

loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    const { data, error } = await sup.auth.signInWithPassword({
        email: email,
        password: password,
    });
    if (error) {
        console.error("Error logging in:", error.message);
    } else {
        showGroceriesList(data.user);
    }
});


window.addEventListener("load", async () => {
    const { data } = await sup.auth.getSession();
    if (data.session) {
        showGroceriesList(data.session.user);
    } else {
        showLoginForm();
    }
});


const logoutBtn = document.getElementById("logoutBtn");
const logoutSection = document.getElementById("logoutFieldSet");

logoutBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const { error } = await sup.auth.signOut();
      if (error) {
            console.error("Error logging out:", error.message);
          } else {
            showLoginForm();
          }
    });


sup.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
        showGroceriesList(session.user);
    }
    if (event === "SIGNED_OUT") {
        showLoginForm();
    }
});

function showGroceriesList(user) {
    loginSection.classList.add("hide");
    loginSection.classList.remove("showGrid");
    listSection.classList.add("show");
    listSection.classList.remove("hide");
    logoutSection.classList.add("show");
    logoutSection.classList.remove("hide");
    usernameSpan.textContent = user.email;
}

function showLoginForm() {
    loginSection.classList.add("showGrid");
    loginSection.classList.remove("hide");
    listSection.classList.add("hide");
    listSection.classList.remove("show");
    logoutSection.classList.add("hide");
    logoutSection.classList.remove("show");
    usernameSpan.textContent = "";
}

// Groceries List Management
const itemInput = document.getElementById("itemInput");
const addItemBtn = document.getElementById("addItemBtn");
const groceriesList = document.getElementById("groceriesList");

addItemBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const item = itemInput.value;
    if (item.length > 2) {
        const {data, error} = await sup.from('groceries').insert([{name: item}]).select();
        if (error) {
            console.error('Error adding item:', error.message);
            return;
        }
        console.info('Item added successfully:', data);
        const newItem = document.createElement("li");
        newItem.id = data[0].id;
        // newItem.className = "list-group-item";
        newItem.textContent = item;
        groceriesList.appendChild(newItem);
        itemInput.value = "";
    }
});

