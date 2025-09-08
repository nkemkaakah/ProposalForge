import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RoleAccessControls() {
  const currentUserRole = "Retail Manager";
  const accessLevel = "Full Access";

  const permissions = {
    view: ["Email Templates", "Send History"],
    edit: ["Company Details", "Email Content"],
    admin: ["User Management", "API Settings"]
  };

  return (
    <div className="mt-8">
      <Card data-testid="role-access-controls">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Role-Based Access Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current User Role */}
          <div className="flex items-center justify-between p-3 bg-muted rounded-md">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-foreground">Current User Role:</span>
              <Badge variant="default" className="bg-primary text-primary-foreground">
                {currentUserRole}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              Access Level: {accessLevel}
            </div>
          </div>

          {/* Permissions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {/* View Permissions */}
            <Card className="p-3">
              <div className="font-medium text-foreground mb-1">View Permissions</div>
              {permissions.view.map((permission) => (
                <div key={permission} className="text-muted-foreground">
                  ✓ {permission}
                </div>
              ))}
            </Card>

            {/* Edit Permissions */}
            <Card className="p-3">
              <div className="font-medium text-foreground mb-1">Edit Permissions</div>
              {permissions.edit.map((permission) => (
                <div key={permission} className="text-muted-foreground">
                  ✓ {permission}
                </div>
              ))}
            </Card>

            {/* Admin Permissions */}
            <Card className="p-3">
              <div className="font-medium text-foreground mb-1">Admin Permissions</div>
              {permissions.admin.map((permission) => (
                <div key={permission} className="text-muted-foreground">
                  ✓ {permission}
                </div>
              ))}
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
