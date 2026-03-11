import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('Starting data deletion...');

  try {
    // Delete notifications
    const deletedNotifications = await prisma.notification.deleteMany();
    console.log(`Deleted ${deletedNotifications.count} Notifications.`);

    // Delete announcements and reads
    const deletedAnnouncementReads = await prisma.announcementRead.deleteMany();
    console.log(`Deleted ${deletedAnnouncementReads.count} AnnouncementReads.`);
    
    const deletedAnnouncements = await prisma.announcement.deleteMany();
    console.log(`Deleted ${deletedAnnouncements.count} Announcements.`);

    // Delete documents
    const deletedDocuments = await prisma.document.deleteMany();
    console.log(`Deleted ${deletedDocuments.count} Documents.`);

    // Delete tenders
    const deletedTenders = await prisma.tender.deleteMany();
    console.log(`Deleted ${deletedTenders.count} Tenders.`);

    // Delete task assignments
    const deletedTaskAssignments = await prisma.taskAssignment.deleteMany();
    console.log(`Deleted ${deletedTaskAssignments.count} TaskAssignments.`);

    // Delete tasks
    const deletedTasks = await prisma.task.deleteMany();
    console.log(`Deleted ${deletedTasks.count} Tasks.`);

    console.log('Data deletion completed successfully! Logins and Accounts (Users, Roles, Departments) have been preserved.');
  } catch (error) {
    console.error('Error deleting data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
