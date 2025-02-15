<template>
  <div id="servies">
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
import { ref, onMounted } from "vue";
import { createAuth0 } from '@auth0/auth0-vue';
import getEnv from '@/utils/env';
import { useAuth0 } from '@auth0/auth0-vue';

// Create a new Auth0 instance for generating the token with a different clientId and audience
const auth0InstanceForAPI = createAuth0({
  domain: getEnv('VITE_AUTH0_DOMAIN'),
  clientId: getEnv('VITE_AUTH0_CLIENT_ID_2'),  // Different clientId
  authorizationParams: {
    redirect_uri: window.location.origin,
    scope: 'read:tenants read:orgHierarchy read:users read:uzng-processing-metadata write:uzng-processing-metadata',  // Ensure `offline_access` is included
    audience: getEnv('VITE_AUTH0_AUDIENCE_2')  // Different audience
  }
});


// Call this function to fetch the token for your API request
const { getAccessTokenSilently } = useAuth0();

const getAPIToken = async () => {
  try {
    const token = await getAccessTokenSilently();

    
    return token;
  } catch (error) {
    console.error("Error fetching API token:", error);
  }
};






const services = ref<{
  serviceName: string;
  startup: { statusCode: number; isAvailable: boolean };
  readiness: { statusCode: number; isAvailable: boolean };
  liveness: { statusCode: number; isAvailable: boolean };
}[]>([]);

const fetchServiceStatuses = async () => {
  try {
    console.log("Fetching data...");
    const token = await getAPIToken();

    console.log(token);
    const response = await axios.get(
      "https://api-srisankaranarayana-muralidaran.us.cloud.uniphoredev.com/uzng-service-status/status-codes",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

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