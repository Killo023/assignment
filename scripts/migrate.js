#!/usr/bin/env node

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../src/models/User.js'

// Load environment variables
dotenv.config()

async function migrateDatabase() {
  try {
    console.log('🔄 Starting database migration...')
    
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to database')
    
    // Migration 1: Add reset password fields
    console.log('📝 Adding reset password fields to users...')
    const result = await User.updateMany(
      { 
        $or: [
          { resetPasswordToken: { $exists: false } },
          { resetPasswordExpires: { $exists: false } }
        ]
      },
      {
        $set: {
          resetPasswordToken: null,
          resetPasswordExpires: null
        }
      }
    )
    console.log(`✅ Updated ${result.modifiedCount} users with reset password fields`)
    
    // Migration 2: Add missing indexes
    console.log('📊 Creating database indexes...')
    
    // Email index for faster lookups
    await User.collection.createIndex({ email: 1 }, { unique: true })
    console.log('✅ Created email index')
    
    // Reset token index for password reset lookups
    await User.collection.createIndex({ resetPasswordToken: 1 })
    console.log('✅ Created reset password token index')
    
    // Role index for role-based queries
    await User.collection.createIndex({ role: 1 })
    console.log('✅ Created role index')
    
    // Subscription indexes
    await User.collection.createIndex({ subscription: 1 })
    await User.collection.createIndex({ institutionSubscription: 1 })
    console.log('✅ Created subscription indexes')
    
    // Created/updated indexes for sorting
    await User.collection.createIndex({ createdAt: -1 })
    await User.collection.createIndex({ updatedAt: -1 })
    console.log('✅ Created timestamp indexes')
    
    // Migration 3: Update existing users with default values
    console.log('🔄 Updating existing users with default values...')
    
    const updateResult = await User.updateMany(
      { 
        $or: [
          { subscription: { $exists: false } },
          { institutionSubscription: { $exists: false } },
          { assignmentsUsed: { $exists: false } },
          { assignmentsLimit: { $exists: false } }
        ]
      },
      {
        $set: {
          subscription: 'free',
          institutionSubscription: 'free',
          assignmentsUsed: 0,
          assignmentsLimit: 3,
          lastResetDate: new Date()
        }
      }
    )
    console.log(`✅ Updated ${updateResult.modifiedCount} users with default values`)
    
    // Migration 4: Validate data integrity
    console.log('🔍 Validating data integrity...')
    
    const totalUsers = await User.countDocuments()
    const usersWithEmail = await User.countDocuments({ email: { $exists: true, $ne: null } })
    const usersWithRole = await User.countDocuments({ role: { $exists: true, $ne: null } })
    
    console.log(`📊 Database statistics:`)
    console.log(`   - Total users: ${totalUsers}`)
    console.log(`   - Users with email: ${usersWithEmail}`)
    console.log(`   - Users with role: ${usersWithRole}`)
    
    if (totalUsers !== usersWithEmail) {
      console.warn('⚠️  Warning: Some users are missing email addresses')
    }
    
    if (totalUsers !== usersWithRole) {
      console.warn('⚠️  Warning: Some users are missing roles')
    }
    
    console.log('✅ Data integrity validation complete')
    
    // Migration 5: Create admin user if none exists
    console.log('👑 Checking for admin user...')
    const adminCount = await User.countDocuments({ role: 'admin' })
    
    if (adminCount === 0) {
      console.log('⚠️  No admin user found. Creating default admin...')
      
      const adminUser = new User({
        name: 'System Administrator',
        email: 'admin@assignmentai.com',
        password: 'Admin123!', // This should be changed immediately
        role: 'admin',
        subscription: 'premium',
        institutionSubscription: 'premium'
      })
      
      await adminUser.save()
      console.log('✅ Created default admin user (admin@assignmentai.com)')
      console.log('⚠️  IMPORTANT: Change the default admin password immediately!')
    } else {
      console.log(`✅ Found ${adminCount} admin user(s)`)
    }
    
    console.log('🎉 Database migration completed successfully!')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 Disconnected from database')
  }
}

// Run migration if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateDatabase()
}

export default migrateDatabase 