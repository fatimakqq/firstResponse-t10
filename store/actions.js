import Store from '.';
// import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
// import { isPlatform } from '@ionic/core';
// import { trailSignOutline } from 'ionicons/icons';
// // import { Plugins } from '@capacitor/core'
import { signIn } from "next-auth/react"

export const setMenuOpen = open => {
  Store.update(s => {
    s.menuOpen = open;
  });
};

export const setNotificationsOpen = open => {
  Store.update(s => {
    s.notificationsOpen = open;
  });
};

export const setSettings = settings => {
  Store.update(s => {
    s.settings = settings;
  });
};

// App-specific actions

export const setDone = (list, item, done) => {
  Store.update((s, o) => {
    const listIndex = o.lists.findIndex(l => l === list);
    const itemIndex = o.lists[listIndex].items.findIndex(i => i === item);
    s.lists[listIndex].items[itemIndex].done = done;
    if (list === o.selectedList) {
      s.selectedList = s.lists[listIndex];
    }
  });
};

// export const googleSignup = async () => {
//   const googleUser = await Plugins.GoogleAuth.signIn(null);
//   console.log('user: ', googleUser);
//   this.userInfo = googleUser;
// };

// export const signIn = async () => {
//   this.user = await GoogleAuth.signIn();
//   console.log('user: ', this.user);
// }

// export const refresh = async () => {
//   const authCode = await GoogleAuth.refresh();
//   console.log('refresh: ', authCode);
// }

// export const signOut = async () => {
//   await GoogleAuth.signOut();
//   this.user = null;
// }

export async function handleGoogleSignin(){
  signIn('google', { callbackUrl : "http://localhost:3000"})
}

