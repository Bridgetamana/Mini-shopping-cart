document.addEventListener('DOMContentLoaded', function () {
    const navbarUser = document.getElementById('navbar-user');
    const menuButton = document.querySelector('[data-collapse-toggle="navbar-user"]');

    menuButton.addEventListener('click', function () {
      navbarUser.classList.toggle('hidden');
    });
  });