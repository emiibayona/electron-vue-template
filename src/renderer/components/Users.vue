<template>
  <div>
    <h1>Users</h1>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
    <input v-model="newUser.name" placeholder="Add a user" />
    <button @click="addUser">Add</button>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  data() {
    return {
      users: [],
      newUser: {
        name: "",
      },
    };
  },
  async created() {
    this.users = await api.getUsers().then((response) => response.data);
  },
  methods: {
    async addUser() {
      const user = await api.createUser(this.newUser);
      this.users.push(user.data);
      this.newUser.name = "";
    },
  },
};
</script>
