# ==========================================
# Enterprise Multi-Cloud Governance Policies
# ==========================================

GOVERNANCE_POLICIES = {

    # =====================================================
    # AZURE
    # =====================================================

    "Azure": {

        # -------------------------------
        # Development
        # -------------------------------

        "Development": {

            "vm_size": {
                "id": "GOV-004",
                "name": "VM Size Policy",
                "field": "vmSize",
                "allowed": [
                    "Standard_B2s"
                ]
            },

            "storage": {
                "id": "GOV-005",
                "name": "Storage Policy",
                "field": "storageType",
                "allowed": [
                    "Standard SSD"
                ]
            },

            "backup": {
                "id": "GOV-006",
                "name": "Backup Policy",
                "field": "enableBackup",
                "required": False
            },

            "monitoring": {
                "id": "GOV-007",
                "name": "Monitoring Policy",
                "field": "enableMonitoring",
                "required": False
            },

            "private_endpoint": {
                "id": "GOV-008",
                "name": "Private Endpoint Policy",
                "field": "enablePrivateEndpoint",
                "required": False
            },

            "public_ip": {
                "id": "GOV-009",
                "name": "Public IP Policy",
                "field": "enablePublicIP",
                "allowed": True
            }

        },

        # -------------------------------
        # Testing
        # -------------------------------

        "Testing": {

            "vm_size": {
                "id": "GOV-004",
                "name": "VM Size Policy",
                "field": "vmSize",
                "allowed": [
                    "Standard_D2s_v5"
                ]
            },

            "storage": {
                "id": "GOV-005",
                "name": "Storage Policy",
                "field": "storageType",
                "allowed": [
                    "Premium SSD"
                ]
            },

            "backup": {
                "id": "GOV-006",
                "name": "Backup Policy",
                "field": "enableBackup",
                "required": True
            },

            "monitoring": {
                "id": "GOV-007",
                "name": "Monitoring Policy",
                "field": "enableMonitoring",
                "required": True
            },

            "private_endpoint": {
                "id": "GOV-008",
                "name": "Private Endpoint Policy",
                "field": "enablePrivateEndpoint",
                "required": True
            },

            "public_ip": {
                "id": "GOV-009",
                "name": "Public IP Policy",
                "field": "enablePublicIP",
                "allowed": True
            }

        },

        # -------------------------------
        # Production
        # -------------------------------

        "Production": {

            "vm_size": {
                "id": "GOV-004",
                "name": "VM Size Policy",
                "field": "vmSize",
                "allowed": [
                    "Standard_D4s_v5"
                ]
            },

            "storage": {
                "id": "GOV-005",
                "name": "Storage Policy",
                "field": "storageType",
                "allowed": [
                    "Premium SSD"
                ]
            },

            "backup": {
                "id": "GOV-006",
                "name": "Backup Policy",
                "field": "enableBackup",
                "required": True
            },

            "monitoring": {
                "id": "GOV-007",
                "name": "Monitoring Policy",
                "field": "enableMonitoring",
                "required": True
            },

            "private_endpoint": {
                "id": "GOV-008",
                "name": "Private Endpoint Policy",
                "field": "enablePrivateEndpoint",
                "required": True
            },

            "public_ip": {
                "id": "GOV-009",
                "name": "Public IP Policy",
                "field": "enablePublicIP",
                "allowed": False
            }

        }

    },

    # =====================================================
    # AWS
    # =====================================================

    "AWS": {

        # -------------------------------
        # Development
        # -------------------------------

        "Development": {

            "vm_size": {
                "id": "GOV-004",
                "name": "VM Size Policy",
                "field": "vmSize",
                "allowed": [
                    "t3.small"
                ]
            },

            "storage": {
                "id": "GOV-005",
                "name": "Storage Policy",
                "field": "storageType",
                "allowed": [
                    "gp3"
                ]
            },

            "backup": {
                "id": "GOV-006",
                "name": "Backup Policy",
                "field": "enableBackup",
                "required": False
            },

            "monitoring": {
                "id": "GOV-007",
                "name": "Monitoring Policy",
                "field": "enableMonitoring",
                "required": False
            },

            "private_endpoint": {
                "id": "GOV-008",
                "name": "Private Endpoint Policy",
                "field": "enablePrivateEndpoint",
                "required": False
            },

            "public_ip": {
                "id": "GOV-009",
                "name": "Public IP Policy",
                "field": "enablePublicIP",
                "allowed": True
            }

        },

        # -------------------------------
        # Testing
        # -------------------------------

        "Testing": {

            "vm_size": {
                "id": "GOV-004",
                "name": "VM Size Policy",
                "field": "vmSize",
                "allowed": [
                    "t3.medium"
                ]
            },

            "storage": {
                "id": "GOV-005",
                "name": "Storage Policy",
                "field": "storageType",
                "allowed": [
                    "gp3"
                ]
            },

            "backup": {
                "id": "GOV-006",
                "name": "Backup Policy",
                "field": "enableBackup",
                "required": True
            },

            "monitoring": {
                "id": "GOV-007",
                "name": "Monitoring Policy",
                "field": "enableMonitoring",
                "required": True
            },

            "private_endpoint": {
                "id": "GOV-008",
                "name": "Private Endpoint Policy",
                "field": "enablePrivateEndpoint",
                "required": True
            },

            "public_ip": {
                "id": "GOV-009",
                "name": "Public IP Policy",
                "field": "enablePublicIP",
                "allowed": True
            }

        },

        # -------------------------------
        # Production
        # -------------------------------

        "Production": {

            "vm_size": {
                "id": "GOV-004",
                "name": "VM Size Policy",
                "field": "vmSize",
                "allowed": [
                    "m5.xlarge"
                ]
            },

            "storage": {
                "id": "GOV-005",
                "name": "Storage Policy",
                "field": "storageType",
                "allowed": [
                    "io2"
                ]
            },

            "backup": {
                "id": "GOV-006",
                "name": "Backup Policy",
                "field": "enableBackup",
                "required": True
            },

            "monitoring": {
                "id": "GOV-007",
                "name": "Monitoring Policy",
                "field": "enableMonitoring",
                "required": True
            },

            "private_endpoint": {
                "id": "GOV-008",
                "name": "Private Endpoint Policy",
                "field": "enablePrivateEndpoint",
                "required": True
            },

            "public_ip": {
                "id": "GOV-009",
                "name": "Public IP Policy",
                "field": "enablePublicIP",
                "allowed": False
            }

        }

    }

}