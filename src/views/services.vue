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
            <span
              v-if="service.startup.isAvailable"
              class="status available"
              :title="getStatusMessage(service.startup.statusCode)"
              >&#10003;</span
            >
            <span
              v-else
              class="status not-available"
              :title="getStatusMessage(service.startup.statusCode)"
              >&#10007;</span
            >
          </td>
          <td>
            <span
              v-if="service.readiness.isAvailable"
              class="status available"
              :title="getStatusMessage(service.readiness.statusCode)"
              >&#10003;</span
            >
            <span
              v-else
              class="status not-available"
              :title="getStatusMessage(service.readiness.statusCode)"
              >&#10007;</span
            >
          </td>
          <td>
            <span
              v-if="service.liveness.isAvailable"
              class="status available"
              :title="getStatusMessage(service.liveness.statusCode)"
              >&#10003;</span
            >
            <span
              v-else
              class="status not-available"
              :title="getStatusMessage(service.liveness.statusCode)"
              >&#10007;</span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';
import { ref, onMounted } from 'vue';
import { useGlobalTokenStore } from '@/authtoken';
import axios from 'axios';

const { getAccessTokenSilently } = useAuth0();
const services = ref<{
  serviceName: string;
  startup: { statusCode: number; isAvailable: boolean };
  readiness: { statusCode: number; isAvailable: boolean };
  liveness: { statusCode: number; isAvailable: boolean };
}[]>([]);

const getStatusMessage = (statusCode: number) => {
  const statusMessages: { [key: number]: string } = {
    200: 'OK - The service is available.',
    400: 'Bad Request - The request was invalid.',
    401: 'Unauthorized - Authentication is required.',
    403: 'Forbidden - You do not have permission.',
    404: 'Not Found - The service was not found.',
    500: 'Internal Server Error - An error occurred on the server.',
    // Add more status codes and messages as needed
  };
  return statusMessages[statusCode] || `Status Code: ${statusCode} - Unknown status`;
};

const getAPIToken = async () => {
  try {
    const tokenprovider = useGlobalTokenStore();
    const token = await tokenprovider.getToken();
    const response = await axios.get(
      ' https://api-srisankaranarayana-muralidaran.us.cloud.uniphoredev.com/uzng-service-status/status-codes',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const statusCodes = response.data.status_codes;
    services.value = [
      {
        serviceName: 'uzng-gateway',
        startup: {
          statusCode: statusCodes.gateway_startup,
          isAvailable: statusCodes.gateway_startup === 200,
        },
        readiness: {
          statusCode: statusCodes.gateway_readiness,
          isAvailable: statusCodes.gateway_readiness === 200,
        },
        liveness: {
          statusCode: statusCodes.gateway_liveness,
          isAvailable: statusCodes.gateway_liveness === 200,
        },
      },
      {
        serviceName: 'uzng-flow-manager',
        startup: {
          statusCode: statusCodes.flow_startup,
          isAvailable: statusCodes.flow_startup === 200,
        },
        readiness: {
          statusCode: statusCodes.flow_readiness,
          isAvailable: statusCodes.flow_readiness === 200,
        },
        liveness: {
          statusCode: statusCodes.flow_liveness,
          isAvailable: statusCodes.flow_liveness === 200,
        },
      },
      {
        serviceName: 'score-card-studio-backend',
        startup: {
          statusCode: statusCodes.scorecard_backend_startup,
          isAvailable: statusCodes.scorecard_backend_startup === 200,
        },
        readiness: {
          statusCode: statusCodes.scorecard_backend_readiness,
          isAvailable: statusCodes.scorecard_backend_readiness === 200,
        },
        liveness: {
          statusCode: statusCodes.scorecard_backend_liveness,
          isAvailable: statusCodes.scorecard_backend_liveness === 200,
        },
      },
      {
        serviceName: 'score-card-studio-runtime',
        startup: {
          statusCode: statusCodes.scorecard_runtime_startup,
          isAvailable: statusCodes.scorecard_runtime_startup === 200,
        },
        readiness: {
          statusCode: statusCodes.scorecard_runtime_readiness,
          isAvailable: statusCodes.scorecard_runtime_readiness === 200,
        },
        liveness: {
          statusCode: statusCodes.scorecard_runtime_liveness,
          isAvailable: statusCodes.scorecard_runtime_liveness === 200,
        },
      },
      {
        serviceName: 'uzng-audio-processor',
        startup: {
          statusCode: statusCodes.audio_processor_startup,
          isAvailable: statusCodes.audio_processor_startup === 200,
        },
        readiness: {
          statusCode: statusCodes.audio_processor_readiness,
          isAvailable: statusCodes.audio_processor_readiness === 200,
        },
        liveness: {
          statusCode: statusCodes.audio_processor_liveness,
          isAvailable: statusCodes.audio_processor_liveness === 200,
        },
      },
      {
        serviceName: 'uzng-conversation-facts-backend',
        startup: {
          statusCode: statusCodes.conversation_facts_startup,
          isAvailable: statusCodes.conversation_facts_startup === 200,
        },
        readiness: {
          statusCode: statusCodes.conversation_facts_readiness,
          isAvailable: statusCodes.conversation_facts_readiness === 200,
        },
        liveness: {
          statusCode: statusCodes.conversation_facts_liveness,
          isAvailable: statusCodes.conversation_facts_liveness === 200,
        },
      },
      {
        serviceName: 'uzng-data-replicator',
        startup: {
          statusCode: statusCodes.data_replicator_startup,
          isAvailable: statusCodes.data_replicator_startup === 200,
        },
        readiness: {
          statusCode: statusCodes.data_replicator_readiness,
          isAvailable: statusCodes.data_replicator_readiness === 200,
        },
        liveness: {
          statusCode: statusCodes.data_replicator_liveness,
          isAvailable: statusCodes.data_replicator_liveness === 200,
        },
      },
      {
        serviceName: 'uzng-facts-resolver',
        startup: {
          statusCode: statusCodes.facts_resolver_startup,
          isAvailable: statusCodes.facts_resolver_startup === 200,
        },
        readiness: {
          statusCode: statusCodes.facts_resolver_readiness,
          isAvailable: statusCodes.facts_resolver_readiness === 200,
        },
        liveness: {
          statusCode: statusCodes.facts_resolver_liveness,
          isAvailable: statusCodes.facts_resolver_liveness === 200,
        },
      },
      {
        serviceName: 'uzng-orchestrator',
        startup: {
          statusCode: statusCodes.orchestrator_startup,
          isAvailable: statusCodes.orchestrator_startup === 200,
        },
        readiness: {
          statusCode: statusCodes.orchestrator_readiness,
          isAvailable: statusCodes.orchestrator_readiness === 200,
        },
        liveness: {
          statusCode: statusCodes.orchestrator_liveness,
          isAvailable: statusCodes.orchestrator_liveness === 200,
        },
      },
      {
        serviceName: 'uzng-orchestrator-sweeper',
        startup: {
          statusCode: statusCodes.orchestrator_sweeper_startup,
          isAvailable: statusCodes.orchestrator_sweeper_startup === 200,
        },
        readiness: {
          statusCode: statusCodes.orchestrator_sweeper_readiness,
          isAvailable: statusCodes.orchestrator_sweeper_readiness === 200,
        },
        liveness: {
          statusCode: statusCodes.orchestrator_sweeper_liveness,
          isAvailable: statusCodes.orchestrator_sweeper_liveness === 200,
        },
      },
      {
        serviceName: 'uzng-sentiments',
        startup: {
          statusCode: statusCodes.sentiments_startup,
          isAvailable: statusCodes.sentiments_startup === 200,
        },
        readiness: {
          statusCode: statusCodes.sentiments_readiness,
          isAvailable: statusCodes.sentiments_readiness === 200,
        },
        liveness: {
          statusCode: statusCodes.sentiments_liveness,
          isAvailable: statusCodes.sentiments_liveness === 200,
        },
      },
    ];

  } catch (error) {
    console.error('Error fetching API token:', error);
  }
};
onMounted(() => {
  getAPIToken();
});
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

table,
th,
td {
  border: 1px solid #ddd;
}

th,
td {
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
