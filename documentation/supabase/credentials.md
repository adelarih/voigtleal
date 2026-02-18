# Supabase Credentials - Wedding Project

**Project URL:** `https://jbuabsyrrnzruyearqqm.supabase.co`
**Project ID:** `jbuabsyrrnzruyearqqm`
**API Key (Default/Publishable):** `sb_publishable_Vw4JVMXl3Oxq6wS6e3GqTw_5IiJyLT0`
**Anon Key (JWT):** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpidWFic3lycm56cnV5ZWFycXFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDI5MTIsImV4cCI6MjA4NzAxODkxMn0.WFxZWN_OVZYfEghsfYsTPysOM__Zh_IndU_GXjKpuFU`

### Table: `lista_confirmados`
| Column | Type | Description |
|---|---|---|
| `id` | `uuid` | Primary Key (Default: uuid_generate_v4()) |
| `created_at` | `timestamp with time zone` | Creation time |
| `name` | `text` | Guest full name |
| `delet_at` | `timestamp with time zone` | Soft delete field |
| `change_at` | `timestamp with time zone` | Update time |
| `cerimonia_religiosa` | `boolean` | Attendance for Religious Ceremony |
| `cerimonia_festiva` | `boolean` | Attendance for Festive Ceremony |
| `brinde_casa` | `boolean` | Attendance for the Toast at home |

### Table: `recados`
| Column | Type | Description |
|---|---|---|
| `id` | `uuid` | Primary Key |
| `created_at` | `timestamp with time zone` | Creation time |
| `nome` | `text` | Guest name |
| `recado` | `text` | Message content |
| `aprovado` | `boolean` | Moderation status (default: false) |
| `delet_at` | `timestamp with time zone` | Soft delete field |
| `change_at` | `timestamp with time zone` | Update time |

### SQL for RPC Functions

#### 1. Confirmar Presença (RSVP)
See implementation: [`documentation/supabase/functions/confirmar_presenca.sql`](functions/confirmar_presenca.sql)

#### 2. Enviar Recado (Guestbook)
See implementation: [`documentation/supabase/functions/enviar_recado.sql`](functions/enviar_recado.sql)
*Note: Messages are submitted with `aprovado = false` by default for future moderation.*
