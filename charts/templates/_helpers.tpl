{{/*
Expand the name of the chart.
*/}}
{{- define "jupiter-base-ui.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "jupiter-base-ui.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "jupiter-base-ui.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "jupiter-base-ui.labels" -}}
helm.sh/chart: {{ include "jupiter-base-ui.chart" . }}
{{ include "jupiter-base-ui.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "jupiter-base-ui.selectorLabels" -}}
app.kubernetes.io/name: {{ include "jupiter-base-ui.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "jupiter-base-ui.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "jupiter-base-ui.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{- define "jupiter-base-ui.ingress.annotations" -}}
ingress.kubernetes.io/force-ssl-redirect: "true"
{{- end }}

{{- define "jupiter-base-ui.ingress.tls" -}}
{{- if .Values.defaultHostname -}}
tls:
  - hosts:
      - {{ .Values.ingress.host }}
    secretName: {{ .Values.ingress.wildcardCert.certCloud }}
{{- else }}
tls:
  - hosts:
      - {{ .Values.ingress.hostName }}.{{ .Values.ingress.domainName }}
    secretName: {{ .Values.ingress.certName }}
{{- end }}
{{- end }}
