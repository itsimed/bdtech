import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Save, 
  X, 
  Heart, 
  LogOut,
  Camera,
  Lock,
  Building,
  Eye,
  EyeOff,
  Shield
} from 'lucide-react';
import CatalogueNavbar from '../components/CatalogueNavbar';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [usernameData, setUsernameData] = useState({
    currentUsername: 'jean.dupont',
    newUsername: 'jean.dupont'
  });
  const [showUsernameForm, setShowUsernameForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    phone: '+33 6 12 34 56 78',
    company: 'BDTECH Solutions',
    position: 'Directeur IT',
    address: '123 Rue de la Paix, 75001 Paris'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUsernameChange = (field: string, value: string) => {
    setUsernameData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving profile data:', formData);
    setIsEditing(false);
    // Ici on pourrait ajouter une API call pour sauvegarder
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
    setFormData({
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@email.com',
      phone: '+33 6 12 34 56 78',
      company: 'BDTECH Solutions',
      position: 'Directeur IT',
      address: '123 Rue de la Paix, 75001 Paris'
    });
  };

  const handlePasswordSave = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Changing password:', passwordData);
    setShowPasswordForm(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    // Ici on pourrait ajouter une API call pour changer le mot de passe
  };

  const handlePasswordCancel = () => {
    setShowPasswordForm(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleUsernameSave = () => {
    if (usernameData.newUsername.length < 3) {
      alert('Username must contain at least 3 characters');
      return;
    }
    console.log('Changing username:', usernameData);
    setShowUsernameForm(false);
    setUsernameData(prev => ({
      currentUsername: prev.newUsername,
      newUsername: prev.newUsername
    }));
    // Ici on pourrait ajouter une API call pour changer le nom d'utilisateur
  };

  const handleUsernameCancel = () => {
    setShowUsernameForm(false);
    setUsernameData(prev => ({
      currentUsername: prev.currentUsername,
      newUsername: prev.currentUsername
    }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'wishlist', label: 'Wishlist', icon: Heart }
  ];

  const mockWishlist = [
    {
      id: '1',
      name: 'Serveur Dell PowerEdge R750',
      price: 2500.00,
      image: 'D'
    },
    {
      id: '2',
      name: 'Switch Cisco Catalyst 9300',
      price: 1800.00,
      image: 'C'
    },
    {
      id: '3',
      name: 'Licence Microsoft 365 Business',
      price: 450.00,
      image: 'M'
    }
  ];

  const renderProfileTab = () => (
    <div className="space-y-4 sm:space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-bdtech-light to-bdtech-medium rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl sm:text-3xl">
                {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
              </span>
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-bdtech-light transition-colors duration-200">
              <Camera size={14} className="sm:w-4 sm:h-4 text-gray-600" />
            </button>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-bdtech-dark">
              {formData.firstName} {formData.lastName}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">{formData.position} at {formData.company}</p>
            <p className="text-xs sm:text-sm text-gray-500">Member since January 2024</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-bdtech-light text-white rounded-lg hover:bg-bdtech-medium transition-colors duration-200 text-sm sm:text-base"
          >
            <Edit size={14} className="sm:w-4 sm:h-4" />
            <span>{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-bdtech-dark mb-4 sm:mb-6">Personal Information</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-bdtech-light focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-bdtech-light focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-bdtech-light focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bdtech-light focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                disabled={!isEditing}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-bdtech-light focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => handleInputChange('position', e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-bdtech-light focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
          
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                disabled={!isEditing}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-bdtech-light focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={handleCancel}
              className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base"
            >
              <X size={16} />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-bdtech-medium text-white rounded-lg hover:bg-bdtech-dark transition-colors duration-200 text-sm sm:text-base"
            >
              <Save size={16} />
              <span>Save</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-4 sm:space-y-6">
      {/* Username Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
          <h3 className="text-lg sm:text-xl font-semibold text-bdtech-dark">Username</h3>
          {!showUsernameForm && (
            <button
              onClick={() => setShowUsernameForm(true)}
              className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-bdtech-light text-white rounded-lg hover:bg-bdtech-medium transition-colors duration-200 text-sm sm:text-base"
            >
              <User size={16} />
              <span>Change Username</span>
            </button>
          )}
        </div>

        {showUsernameForm ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={usernameData.currentUsername}
                  disabled
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={usernameData.newUsername}
                  onChange={(e) => handleUsernameChange('newUsername', e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-bdtech-light focus:border-transparent"
                  placeholder="Enter your new username"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                onClick={handleUsernameCancel}
                className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base"
              >
                <X size={16} />
                <span>Annuler</span>
              </button>
              <button
                onClick={handleUsernameSave}
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-bdtech-medium text-white rounded-lg hover:bg-bdtech-dark transition-colors duration-200 text-sm sm:text-base"
              >
                <Save size={16} />
                <span>Change Username</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <User className="text-bdtech-medium" size={18} />
              <div>
                <h4 className="font-semibold text-bdtech-dark text-sm sm:text-base">Username</h4>
                <p className="text-xs sm:text-sm text-gray-600">{usernameData.currentUsername}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Password Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
          <h3 className="text-lg sm:text-xl font-semibold text-bdtech-dark">Password</h3>
          {!showPasswordForm && (
            <button
              onClick={() => setShowPasswordForm(true)}
              className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-bdtech-light text-white rounded-lg hover:bg-bdtech-medium transition-colors duration-200 text-sm sm:text-base"
            >
              <Lock size={16} />
              <span>Change Password</span>
            </button>
          )}
        </div>

        {showPasswordForm ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-10 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-bdtech-light focus:border-transparent"
                  placeholder="Enter your current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-10 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-bdtech-light focus:border-transparent"
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-10 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-bdtech-light focus:border-transparent"
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                onClick={handlePasswordCancel}
                className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base"
              >
                <X size={16} />
                <span>Annuler</span>
              </button>
              <button
                onClick={handlePasswordSave}
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-bdtech-medium text-white rounded-lg hover:bg-bdtech-dark transition-colors duration-200 text-sm sm:text-base"
              >
                <Save size={16} />
                <span>Change Password</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Lock className="text-bdtech-medium" size={18} />
              <div>
                <h4 className="font-semibold text-bdtech-dark text-sm sm:text-base">Password</h4>
                <p className="text-xs sm:text-sm text-gray-600">Last modified 30 days ago</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderWishlistTab = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-bdtech-dark mb-4 sm:mb-6">My Wishlist</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {mockWishlist.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-bdtech-light to-bdtech-medium rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm sm:text-base">{item.image}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-bdtech-dark text-sm sm:text-base truncate">{item.name}</h4>
                  <p className="text-bdtech-medium font-semibold text-sm sm:text-base">{item.price.toFixed(2)} €</p>
                </div>
                <button className="text-red-500 hover:text-red-700 transition-colors duration-200 flex-shrink-0">
                  <Heart size={16} className="fill-current" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'security':
        return renderSecurityTab();
      case 'wishlist':
        return renderWishlistTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CatalogueNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">


        {/* Mobile Tabs */}
        <div className="lg:hidden mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
            <div className="flex space-x-1">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex flex-col items-center space-y-1 px-3 py-3 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-bdtech-light text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-bdtech-dark'
                    }`}
                  >
                    <IconComponent size={18} />
                    <span className="text-xs font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar - Desktop only */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-bdtech-light text-white'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-bdtech-dark'
                      }`}
                    >
                      <IconComponent size={20} />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
                  <LogOut size={20} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 