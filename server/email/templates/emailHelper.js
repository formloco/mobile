module.exports = function getTemplate(tenant) {

  if (tenant.tenant_id == 'formloco') {
    const EMAIL_TEMPLATE = require('./formloco')
    return EMAIL_TEMPLATE
  }

  if (tenant.tenant_id == 'summit') {
    const EMAIL_TEMPLATE = require('./summit')
    return EMAIL_TEMPLATE
  }

}

