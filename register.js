        // Lógica de registro (aquí practicas lo que piden)
        document.getElementById('registerForm').addEventListener('submit', function(e) {
            e.preventDefault(); // Evita reload

            // Variables: capturar inputs
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const errorMessage = document.getElementById('errorMessage');

            // Control flow: validaciones
            if (!email || !password || !confirmPassword) {
                errorMessage.textContent = 'Todos los campos son obligatorios.';
                errorMessage.classList.remove('d-none');
                return;
            }

            if (password !== confirmPassword) {
                errorMessage.textContent = 'Las contraseñas no coinciden.';
                errorMessage.classList.remove('d-none');
                return;
            }

            if (password.length < 6) {
                errorMessage.textContent = 'La contraseña debe tener al menos 6 caracteres.';
                errorMessage.classList.remove('d-none');
                return;
            }

            // Obtener users de localStorage (array)
            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Validar email único
            if (users.find(user => user.email === email)) {
                errorMessage.textContent = 'Este email ya está registrado.';
                errorMessage.classList.remove('d-none');
                return;
            }

            // Crear nuevo user object
            const newUser = {
                email: email,
                password: password, // En real no guardar plain, pero para práctica ok
                profiles: [{ id: 1, name: 'Principal' }], // Perfil default
                favorites: {} // { profileId: [itemIds] }
            };

            // Agregar al array y guardar
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            // Éxito: limpiar error y redirigir
            errorMessage.classList.add('d-none');
            alert('¡Registro exitoso! Ahora inicia sesión.');
            window.location.href = 'login.html';
        });

        // Protección: si ya está logueado, redirigir
        if (sessionStorage.getItem('loggedEmail')) {
            window.location.href = 'profiles.html';
        }