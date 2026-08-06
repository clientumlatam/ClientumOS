import React, { useState, useEffect } from 'react';
import { Card } from '../../packages/ui/src/components/card';
import { DashboardGrid } from '../../packages/ui/src/components/dashboard';
import { StatCard } from '../../packages/ui/src/components/stat-card';
import { SimpleTable, SimpleTableRow } from '../../packages/ui/src/components/simple-table';
import { TableCell } from '../../packages/ui/src/components/table';
import { Spinner } from '../../packages/ui/src/components/spinner';

export const AdminConsole: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>({});
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'members' | 'audit-logs'>('members');

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/users').then(res => res.ok ? res.json() : []).catch(() => []),
      fetch('/api/admin/metrics').then(res => res.ok ? res.json() : {}).catch(() => ({})),
      fetch('/api/admin/audit-logs').then(res => res.ok ? res.json() : []).catch(() => []),
      fetch('/api/admin/health-alerts').then(res => res.ok ? res.json() : []).catch(() => [])
    ]).then(([userData, metricsData, logData, alertData]) => {
      setUsers(Array.isArray(userData) ? userData : []);
      setMetrics(metricsData || {});
      setLogs(Array.isArray(logData) ? logData : []);
      setAlerts(Array.isArray(alertData) ? alertData : []);
      setLoading(false);
    }).catch(err => {
      console.error('[AdminConsole] Error in Promise.all:', err);
      setLoading(false);
    });
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    const res = await fetch(`/api/admin/users/${userId}/role`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole })
    });
    if (res.ok) {
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } else {
      alert('Failed to update role');
    }
  };

  const handleBulkAction = async (action: 'role' | 'delete', role?: string) => {
    const url = action === 'role' ? '/api/admin/users/bulk-role' : '/api/admin/users/bulk-delete';
    const body = action === 'role' ? { userIds: selectedUserIds, role } : { userIds: selectedUserIds };
    
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (res.ok) {
      if (action === 'delete') {
        setUsers(users.filter(u => !selectedUserIds.includes(u.id.toString())));
      } else {
        setUsers(users.map(u => selectedUserIds.includes(u.id.toString()) ? { ...u, role } : u));
      }
      setSelectedUserIds([]);
    } else {
      alert('Bulk action failed');
    }
  };

  const toggleSelectAll = () => {
    if (selectedUserIds.length === users.length) setSelectedUserIds([]);
    else setSelectedUserIds(users.map(u => u.id.toString()));
  };

  const toggleSelectUser = (id: string) => {
    if (selectedUserIds.includes(id)) setSelectedUserIds(selectedUserIds.filter(i => i !== id));
    else setSelectedUserIds([...selectedUserIds, id]);
  };

  if (loading) return <div className="p-8 flex justify-center"><Spinner /></div>;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Admin Console</h1>
      {alerts.map(alert => (
        <div key={alert.id} className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {alert.message}
        </div>
      ))}
      <DashboardGrid>
        <StatCard label="Total Users" value={metrics.totalUsers} />
        <StatCard label="DB Latency" value={metrics.dbLatency} />
      </DashboardGrid>
      
      <div className="flex gap-4 border-b">
        <button onClick={() => setActiveTab('members')} className={`pb-2 ${activeTab === 'members' ? 'border-b-2 border-primary font-bold' : ''}`}>Members</button>
        <button onClick={() => setActiveTab('audit-logs')} className={`pb-2 ${activeTab === 'audit-logs' ? 'border-b-2 border-primary font-bold' : ''}`}>Audit Logs</button>
      </div>

      {activeTab === 'members' && (
        <div className="space-y-4">
          {selectedUserIds.length > 0 && (
            <div className="flex gap-2 p-4 border rounded bg-muted">
              <span className="text-sm font-medium">{selectedUserIds.length} seleccionados</span>
              <select onChange={(e) => handleBulkAction('role', e.target.value)} className="p-1 border rounded text-sm">
                <option value="">Cambiar rol a...</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
              </select>
              <button onClick={() => handleBulkAction('delete')} className="px-2 py-1 bg-red-500 text-white rounded text-sm">Eliminar</button>
            </div>
          )}
          <Card>
            <h2 className="text-xl font-semibold mb-4">User Permissions</h2>
            <SimpleTable
              columns={[
                { header: <input type="checkbox" checked={selectedUserIds.length === users.length && users.length > 0} onChange={toggleSelectAll} />, width: 'w-10' },
                { header: 'ID' },
                { header: 'Username' },
                { header: 'Email' },
                { header: 'Role' }
              ]}
            >
              {users.map(user => (
                <SimpleTableRow key={user.id}>
                  <TableCell><input type="checkbox" checked={selectedUserIds.includes(user.id.toString())} onChange={() => toggleSelectUser(user.id.toString())} /></TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="p-1 border rounded"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                    </select>
                  </TableCell>
                </SimpleTableRow>
              ))}
            </SimpleTable>
          </Card>
        </div>
      )}
      {activeTab === 'audit-logs' && (
        <Card>
          <h2 className="text-xl font-semibold mb-4">Audit Log</h2>
          <SimpleTable
            columns={[
              { header: 'ID' },
              { header: 'Action' },
              { header: 'Details' },
              { header: 'Date' }
            ]}
          >
            {logs.map(log => (
              <SimpleTableRow key={log.id}>
                <TableCell>{log.id}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.details}</TableCell>
                <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
              </SimpleTableRow>
            ))}
          </SimpleTable>
        </Card>
      )}
    </div>
  );
};
