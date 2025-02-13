<template>
  <div id="app">
    <nav>
      <img src="https://www.uniphore.com/wp-content/uploads/2024/08/uniphore-default-featured-card.jpg" alt="Uniphore Logo" class="logo" />
      <ul class="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>

    <h1>Service Availability Status</h1>
    <table>
      <thead>
        <tr>
          <th>Service</th>
          <th>Startup</th>
          <th>Readiness</th>
          <th>Liveness</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(service, index) in services" :key="index">
          <td>{{ service.serviceName }}</td>
          <td>
            <span v-if="service.startup.isAvailable" class="status available">&#10003;</span>
            <span v-else class="status not-available">&#10007;</span>
          </td>
          <td>
            <span v-if="service.readiness.isAvailable" class="status available">&#10003;</span>
            <span v-else class="status not-available">&#10007;</span>
          </td>
          <td>
            <span v-if="service.liveness.isAvailable" class="status available">&#10003;</span>
            <span v-else class="status not-available">&#10007;</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-vue";
import { ref, onMounted } from "vue";


const auth0 = useAuth0();


const services = ref<
  {
    serviceName: string;
    startup: { statusCode: number; isAvailable: boolean };
    readiness: { statusCode: number; isAvailable: boolean };
    liveness: { statusCode: number; isAvailable: boolean };
  }[]
>([]);

const fetchServiceStatuses = async () => {
  try {
    console.log("Fetching data...");
    const accessToken = await auth0.getAccessTokenSilently();
    console.log("Access Token:", accessToken);
    const response = await axios.get(
      "https://api-srisankaranarayana-muralidaran.us.cloud.uniphoredev.com/uzng-service-status/check-api",
      {
        headers: { Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkxYejBQYWVFRERuS3dfcjdkU2s2UyJ9.eyJodHRwczovL2FwaS51bmlwaG9yZS5jb20vdGVuYW50IjoiZmU1NzIxNTYtMjIxMi00NThlLTg3M2EtNmFjNjBiZWJmNjQyIiwiaHR0cHM6Ly9hcGkudW5pcGhvcmUuY29tL29yZ19pZCI6Im9yZ19TcjJkRHJXSTlvaFY5OFJxIiwiaXNzIjoiaHR0cHM6Ly9kZXYtZzJqNW11MnoudXMuYXV0aDAuY29tLyIsInN1YiI6ImtNbXAzcXNKTWN2NjNOZ0k1RXJyS0hkdlJCM0YxNjdmQGNsaWVudHMiLCJhdWQiOiJhcGkudW5pcGhvcmUuY29tIiwiaWF0IjoxNzM5NDIzMDEzLCJleHAiOjE3Mzk1MDk0MTMsInNjb3BlIjoicmVhZDp1c2VycyByZWFkOnV6bmctcHJvY2Vzc2luZy1tZXRhZGF0YSB3cml0ZTp1em5nLXByb2Nlc3NpbmctbWV0YWRhdGEiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiJrTW1wM3FzSk1jdjYzTmdJNUVycktIZHZSQjNGMTY3ZiIsInBlcm1pc3Npb25zIjpbInJlYWQ6dXNlcnMiLCJyZWFkOnV6bmctcHJvY2Vzc2luZy1tZXRhZGF0YSIsIndyaXRlOnV6bmctcHJvY2Vzc2luZy1tZXRhZGF0YSJdfQ.w09e0QS-yR3s6cm3mpfC2GrIKHLGfL6-i26yrBt4CtvOs8tDYfQB_LL5DBkooG-hhVcjcnXN4dx8ItlZd2B_s1Q15eXIBCTV9HVwBMZ0V5SfOpejCcP8sg9bnPJyHpZDILOl0ilF3PvIli4A3x0b491T7Vp72VtuqtophrkH49ZkZg1zlJkNVz5qA9UOJmSRPl_U0_r0Fu5tCLJJw2NrqaF8pGj1jCv6QNjZ_oMMGYLyjE0SbgceEOkQHEzWKTInlqYh4lWS2Q-MfIiBbW8NkgC29cQXroi0iBaB8q-uqdQPYGjDiHp6E3Jw9Zn3LlwXH7tK6hc9x2ls0e9nYJXuUg` },
      }
    );

    const statusCodes = response.data.status_codes;

    services.value = [
      {
        serviceName: "uzng-gateway",
        startup: { statusCode: statusCodes.gateway_startup, isAvailable: statusCodes.gateway_startup === 200 },
        readiness: { statusCode: statusCodes.gateway_readiness, isAvailable: statusCodes.gateway_readiness === 200 },
        liveness: { statusCode: statusCodes.gateway_liveness, isAvailable: statusCodes.gateway_liveness === 200 },
      },
      {
        serviceName: "uzng-flow-manager",
        startup: { statusCode: statusCodes.flow_startup, isAvailable: statusCodes.flow_startup === 200 },
        readiness: { statusCode: statusCodes.flow_readiness, isAvailable: statusCodes.flow_readiness === 200 },
        liveness: { statusCode: statusCodes.flow_liveness, isAvailable: statusCodes.flow_liveness === 200 },
      },
      {
        serviceName: "score-card-studio-backend",
        startup: { statusCode: statusCodes.scorecard_backend_startup, isAvailable: statusCodes.scorecard_backend_startup === 200 },
        readiness: { statusCode: statusCodes.scorecard_backend_readiness, isAvailable: statusCodes.scorecard_backend_readiness === 200 },
        liveness: { statusCode: statusCodes.scorecard_backend_liveness, isAvailable: statusCodes.scorecard_backend_liveness === 200 },
      },
      {
        serviceName: "score-card-studio-runtime",
        startup: { statusCode: statusCodes.scorecard_runtime_startup, isAvailable: statusCodes.scorecard_runtime_startup === 200 },
        readiness: { statusCode: statusCodes.scorecard_runtime_readiness, isAvailable: statusCodes.scorecard_runtime_readiness === 200 },
        liveness: { statusCode: statusCodes.scorecard_runtime_liveness, isAvailable: statusCodes.scorecard_runtime_liveness === 200 },
      },
      {
        serviceName: "uzng-audio-processor",
        startup: { statusCode: statusCodes.audio_processor_startup, isAvailable: statusCodes.audio_processor_startup === 200 },
        readiness: { statusCode: statusCodes.audio_processor_readiness, isAvailable: statusCodes.audio_processor_readiness === 200 },
        liveness: { statusCode: statusCodes.audio_processor_liveness, isAvailable: statusCodes.audio_processor_liveness === 200 },
      },
      {
        serviceName: "uzng-conversation-facts-backend",
        startup: { statusCode: statusCodes.conversation_facts_startup, isAvailable: statusCodes.conversation_facts_startup === 200 },
        readiness: { statusCode: statusCodes.conversation_facts_readiness, isAvailable: statusCodes.conversation_facts_readiness === 200 },
        liveness: { statusCode: statusCodes.conversation_facts_liveness, isAvailable: statusCodes.conversation_facts_liveness === 200 },
      },
      {
        serviceName: "uzng-data-replicator",
        startup: { statusCode: statusCodes.data_replicator_startup, isAvailable: statusCodes.data_replicator_startup === 200 },
        readiness: { statusCode: statusCodes.data_replicator_readiness, isAvailable: statusCodes.data_replicator_readiness === 200 },
        liveness: { statusCode: statusCodes.data_replicator_liveness, isAvailable: statusCodes.data_replicator_liveness === 200 },
      },
      {
        serviceName: "uzng-facts-resolver",
        startup: { statusCode: statusCodes.facts_resolver_startup, isAvailable: statusCodes.facts_resolver_startup === 200 },
        readiness: { statusCode: statusCodes.facts_resolver_readiness, isAvailable: statusCodes.facts_resolver_readiness === 200 },
        liveness: { statusCode: statusCodes.facts_resolver_liveness, isAvailable: statusCodes.facts_resolver_liveness === 200 },
      },
      {
        serviceName: "uzng-orchestrator",
        startup: { statusCode: statusCodes.orchestrator_startup, isAvailable: statusCodes.orchestrator_startup === 200 },
        readiness: { statusCode: statusCodes.orchestrator_readiness, isAvailable: statusCodes.orchestrator_readiness === 200 },
        liveness: { statusCode: statusCodes.orchestrator_liveness, isAvailable: statusCodes.orchestrator_liveness === 200 },
      },
      {
        serviceName: "uzng-orchestrator-sweeper",
        startup: { statusCode: statusCodes.orchestrator_sweeper_startup, isAvailable: statusCodes.orchestrator_sweeper_startup === 200 },
        readiness: { statusCode: statusCodes.orchestrator_sweeper_readiness, isAvailable: statusCodes.orchestrator_sweeper_readiness === 200 },
        liveness: { statusCode: statusCodes.orchestrator_sweeper_liveness, isAvailable: statusCodes.orchestrator_sweeper_liveness === 200 },
      },
      {
        serviceName: "uzng-sentiments",
        startup: { statusCode: statusCodes.sentiments_startup, isAvailable: statusCodes.sentiments_startup === 200 },
        readiness: { statusCode: statusCodes.sentiments_readiness, isAvailable: statusCodes.sentiments_readiness === 200 },
        liveness: { statusCode: statusCodes.sentiments_liveness, isAvailable: statusCodes.sentiments_liveness === 200 },
      },
    ];

    console.log("Services:", services.value);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Fetch data when the component is mounted
onMounted(fetchServiceStatuses);
</script>


 
<style scoped>
#app {
  font-family: Arial, sans-serif;
  margin: 10px;
}
 
nav {
  display: flex;
  justify-content: space-between;
  background-color: #6d6d6db8;
  padding: 10px;
  color: rgba(0, 0, 0);
  align-items: center;
  margin:0px;
}
 
nav .logo {
  height: 100px;
  width: 200px;
}
 
nav .nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
}
 
nav .nav-links li {
  display: inline;
}
 
nav .nav-links a {
  text-decoration: none;
  color: rgb(0, 0, 0);
  font-weight: bold;
}
 
h1 {
  margin-top: 40px;
  text-align: center;
}
 
table {
  width: 100%;
  margin-top: 20px;
}
 
table, th, td {
  border: 1px solid #ddd;
}
 
th, td {
  padding: 12px;
  text-align: left;
}
 
th {
  background-color: #f4f4f4;
}
 
.status {
  font-size: 18px;
}
 
.status.available {
  color: green;
}
 
.status.not-available {
  color: red;
}
</style>