resource "azurerm_firewall_policy" "this" {
  name                = var.policy_name
  resource_group_name = var.resource_group_name
  location            = var.location

  sku = "Standard"

  tags = var.tags
}