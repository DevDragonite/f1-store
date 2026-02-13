import { create } from 'zustand'
import { supabase } from '../lib/supabase'

/**
 * Auth Store — Zustand store for Supabase Auth session management.
 * Tracks current user, loading state, and admin role.
 */
const useAuthStore = create((set, get) => ({
    user: null,
    session: null,
    isAdmin: false,
    loading: true,

    /* Initialize — call once in App.jsx on mount */
    initialize: async () => {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
            set({ user: session.user, session, loading: false, isAdmin: session.user?.user_metadata?.role === 'admin' })
        } else {
            set({ loading: false })
        }

        /* Listen for auth state changes (login, logout, token refresh) */
        supabase.auth.onAuthStateChange((_event, session) => {
            set({
                user: session?.user ?? null,
                session,
                isAdmin: session?.user?.user_metadata?.role === 'admin' || false,
            })
        })
    },

    /* Sign in with email/password */
    signIn: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        set({ user: data.user, session: data.session, isAdmin: data.user?.user_metadata?.role === 'admin' })
        return data
    },

    /* Sign up */
    signUp: async (email, password, metadata = {}) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: metadata },
        })
        if (error) throw error
        return data
    },

    /* Sign out */
    signOut: async () => {
        await supabase.auth.signOut()
        set({ user: null, session: null, isAdmin: false })
    },
}))

export default useAuthStore
