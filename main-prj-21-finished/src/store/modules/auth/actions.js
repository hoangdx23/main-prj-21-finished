export default {
   async login() {
        // Hàm xử lý đăng nhập
    },
    async signup(context, payload) {
        try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyANjQ3djkBgtiwNyGLrHF5uCQnmUs2d35k`, {
                method: 'POST',
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                })
            });
            const responseData = await response.json();
            if (!response.ok) {
                // Xử lý lỗi nếu có
                console.log(responseData);
                const errorMessage = responseData.error.message || 'Failed to authenticate';
                throw new Error(errorMessage);
            }
            // Xử lý thành công
            console.log(responseData);
            context.commit('setUser', {
                token: responseData.idToken,
                userId: responseData.localId,
                tokenExpiration: responseData.expiresIn
            });
        } catch (error) {
            console.error('Signup error:', error);
            throw error; // Ném lỗi để xử lý ở nơi gọi
        }
    }
}
