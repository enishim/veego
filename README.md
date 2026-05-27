# ISP Manager

Sistema web de gerenciamento de provedor de internet, baseado no Vigo, com integrações a RADIUS, MySQL, iClass e banco para geração de boletos.

---

## Estrutura de arquivos

```
vigopro/
├── index.html          ← Aplicação principal (abrir este no browser)
├── css/
│   └── style.css       ← Estilos globais do sistema
├── js/
│   └── app.js          ← Lógica de navegação e interações
└── README.md           ← Este arquivo
```

---

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub (ex: `vigopro`)
2. Faça upload de todos os arquivos mantendo a estrutura de pastas
3. Vá em **Settings → Pages → Source → main branch → / (root)**
4. Acesse: `https://seu-usuario.github.io/vigopro/`

### Via Git (terminal)
```bash
git init
git add .
git commit -m "VigoPRO ISP Manager - deploy inicial"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/vigopro.git
git push -u origin main
```

---

## Módulos incluídos

| Módulo | Descrição |
|--------|-----------|
| **Dashboard** | Visão geral com KPIs, gráficos e status das integrações |
| **Clientes** | Cadastro completo (PF/PJ), lista com busca/filtro, detalhes |
| **Planos** | Gerenciamento de planos com perfis RADIUS vinculados |
| **Contratos** | Histórico e gestão de contratos por cliente |
| **Boletos** | Geração, envio via WhatsApp, configuração bancária |
| **Cobrança** | Régua de cobrança automática D-3 até D+30 |
| **RADIUS** | Configuração de servidor, sessões ativas, bloqueio/desbloqueio |
| **Equipamentos** | Cadastro de ONUs, roteadores e infraestrutura |
| **iClass** | Configuração de API, sync, matrículas e progresso |
| **Tickets** | Suporte técnico com prioridades |
| **Relatórios** | Exportação CSV de todos os módulos |
| **Integrações** | Painel de status e configuração de todas as integrações |
| **Alertas** | Notificações de inadimplência, bloqueios e erros |

---

## Integrações previstas (produção)

### 🔌 RADIUS (FreeRADIUS)
- Autenticação PPPoE/IPoE
- Criação automática de usuário no cadastro de cliente
- Bloqueio/desbloqueio automático por inadimplência
- Consulta de sessões ativas em tempo real

**Backend necessário:**
```bash
# Instalar FreeRADIUS + MySQL
apt install freeradius freeradius-mysql mysql-server

# Tabelas: radcheck, radreply, radusergroup, radacct
```

### 🗄️ MySQL
```sql
CREATE DATABASE vigopro;
CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255),
  cpf_cnpj VARCHAR(20) UNIQUE,
  email VARCHAR(255),
  telefone VARCHAR(20),
  plano_id INT,
  status ENUM('ativo','bloqueado','inativo'),
  login_radius VARCHAR(100),
  dia_vencimento INT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 🏦 Banco Inter (API v2)
```
POST https://cdpj.partners.bancointer.com.br/cobranca/v2/boletos
Authorization: Bearer {token}
Content-Type: application/json
```

### 🎓 iClass
```
GET  {URL}/api/v1/alunos
POST {URL}/api/v1/matriculas
Authorization: Token {api_token}
```

---

## Tecnologias

- HTML5 + CSS3 puro (sem framework)
- JavaScript vanilla (sem dependências)
- 100% compatível com GitHub Pages (static hosting)
- Responsivo para desktop e tablet

---

## Próximos passos (backend)

Para transformar em sistema real, conecte um backend (Node.js/PHP/Python) com:
- API REST para CRUD de clientes
- Integração real com FreeRADIUS via MySQL
- Webhooks do Banco Inter para confirmar pagamentos
- Cron job para bloqueio automático de inadimplentes
- WebSocket para status em tempo real do RADIUS

---

*Desenvolvido para provedores de internet*
