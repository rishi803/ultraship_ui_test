import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Grid, 
  Layout, 
  MoreVertical, 
  ChevronLeft, 
  Edit3, 
  Flag, 
  Trash2, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Building, 
  MapPin 
} from 'lucide-react';

const DashboardLayout = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch employees data
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        const enrichedData = data.map(user => ({
          ...user,
          department: ['Engineering', 'Marketing', 'Sales', 'Design'][Math.floor(Math.random() * 4)],
          role: ['Manager', 'Senior Developer', 'Designer', 'Analyst'][Math.floor(Math.random() * 4)],
          status: ['Active', 'On Leave', 'Remote'][Math.floor(Math.random() * 3)]
        }));
        setEmployees(enrichedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);


  const menuItems = [
    { label: 'Dashboard', items: ['Overview', 'Analytics', 'Reports'] },
    { label: 'Employees', items: ['Directory', 'Performance', 'Training'] },
    { label: 'Projects', items: ['Active', 'Archived', 'Templates'] },
    'Settings',
    'Help'
  ];

  
  const toggleView = () => {
    setViewMode(prev => prev === 'grid' ? 'tile' : 'grid');
  };

  const EmployeeList = ({ employees, setSelectedEmployee }) => {
    return (
      <div className="employee-table-container">
        <div className="table-wrapper">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Department</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <div className="employee-info">
                      <div className="avatar-container">
                        <div className="avatar">
                          <User />
                        </div>
                      </div>
                      <div className="employee-details">
                        <div className="employee-name">{employee.name}</div>
                        <div className="employee-email">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="employee-role">{employee.role}</div>
                  </td>
                  <td>
                    <span className={`status-badge status-${employee.status.toLowerCase().replace(' ', '-')}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td>
                    <div className="department">{employee.department}</div>
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedEmployee(employee)}
                      className="action-button"
                    >
                      <MoreVertical />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  const EmployeeGrid = ({ employees, setSelectedEmployee }) => {
    return (
      <div className="employee-grid">
        {employees.map((employee) => (
          <div key={employee.id} className="employee-card">
            <div className="card-content">
              <div className="card-header">
                <div className="card-profile">
                  <div className="avatar">
                    <User />
                  </div>
                  <div className="profile-info">
                    <div className="profile-name">{employee.name}</div>
                    <div className="profile-role">{employee.role}</div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEmployee(employee)}
                  className="action-button"
                >
                  <MoreVertical />
                </button>
              </div>
              <div className="card-details">
                <div className="detail-item">
                  <Mail />
                  <span>{employee.email}</span>
                </div>
                <div className="detail-item">
                  <Building />
                  <span>{employee.department}</span>
                </div>
                <div className="detail-item">
                  <MapPin />
                  <span>{employee.address.city}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const ContactInfo = () => (
    <div className="contact-section">
      <h3 className="section-title">Contact Information</h3>
      <div className="info-list">
        <div className="info-item">
          <Mail className="info-icon" />
          <span>{selectedEmployee.email}</span>
        </div>
        <div className="info-item">
          <Phone className="info-icon" />
          <span>{selectedEmployee.phone}</span>
        </div>
        <div className="info-item">
          <Globe className="info-icon" />
          <span>{selectedEmployee.website}</span>
        </div>
      </div>
    </div>
  );

  const EmploymentInfo = () => (
    <div className="employment-section">
      <h3 className="section-title">Employment Details</h3>
      <div className="info-list">
        <div className="info-item">
          <Building className="info-icon" />
          <span>{selectedEmployee.department}</span>
        </div>
        <div className="info-item">
          <MapPin className="info-icon" />
          <span>{selectedEmployee.address.city}</span>
        </div>
        <div className="info-item">
          <span className={`status-badge status-${selectedEmployee.status.toLowerCase().replace(' ', '-')}`}>
            {selectedEmployee.status}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
   
   <header className="StickyHeader">
      <div className="StickyHeader-Content">
        <div className="StickyHeader-Left">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="StickyHeader-MenuButton"
          >
            <Menu className="StickyHeader-MenuIcon" />
          </button>
          <h1 className="StickyHeader-Title">Employee Dashboard</h1>
        </div>
        <button
          onClick={toggleView}
          className="StickyHeader-ViewButton"
        >
          <Grid className="StickyHeader-ViewIcon" />
        </button>
      </div>
    </header>

      {/* Sidebar Menu */}
      <div className={`sliding-menu ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="menu-header">
        <span className="menu-title">Menu</span>
        <button
          onClick={() => setIsMenuOpen(false)}
          className="close-button"
        >
          <X className="close-icon" />
        </button>
      </div>
      <nav className="menu-navigation">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item-wrapper">
            {typeof item === 'string' ? (
              <div className="menu-item">
                {item}
              </div>
            ) : (
              <>
                <div className="menu-item-label">{item.label}</div>
                <div className="submenu-container">
                  {item.items.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className="submenu-item"
                    >
                      {subItem}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </nav>
    </div>

      {/* Main Content */}
      <main className="dashboard-container">
      {loading ? (
        <div className="loading-container">
          <div className="loading-text">Loading...</div>
        </div>
      ) : viewMode === 'grid' ? (
        <EmployeeList employees={employees} setSelectedEmployee={setSelectedEmployee} />
      ) : (
        <EmployeeGrid employees={employees} setSelectedEmployee={setSelectedEmployee} />
      )}
    </main>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
       <div className="modal-overlay">
       <div className="modal-container">
         <div className="modal-header">
           <h2 className="modal-title">Employee Details</h2>
           <button
             onClick={() => setSelectedEmployee(null)}
             className="close-button"
           >
             <X />
           </button>
         </div>
         <div className="modal-content">
           <div className="employee-profile">
             <div className="profile-avatar">
               <User />
             </div>
             <div className="profile-info">
               <div className="profile-name">{selectedEmployee.name}</div>
               <div className="profile-role">{selectedEmployee.role}</div>
             </div>
           </div>
           <div className="details-grid">
             <ContactInfo />
             <EmploymentInfo />
           </div>
         </div>
       </div>
     </div>
      )}
    </div>
  );
};

export default DashboardLayout;