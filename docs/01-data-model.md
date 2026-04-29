# Data Model Notes

## Purpose

This document is where I will keep notes about the database design for my job application tracker.

The goal is to think about the main data I need before I start coding the backend.

## Main Tables I Am Considering

For now, these are the main tables I may need:

- Users
- Job Applications
- Stages
- Application Stage History
- Tags
- Application Tags
- Reminders
- Documents
- Contacts

## MVP Decision

For the first version, I want to keep the database simple.

I will start with the most important parts:

- Users
- Job Applications
- Stages
- Tags

After the basic app is working, I can add more features like reminders, documents, and contacts.

## Questions I Still Need to Decide

Some things are still not final:

- Should reminders be their own table, or should I just add a follow-up date to each job application first?
- Should documents belong to one job application, or should the user be able to reuse the same document for multiple applications?
- Should the current application status be stored directly in the job application table, or should I track every status change in a history table?

## Current Plan

My plan is to start simple and avoid overcomplicating the database too early.

First, I want to build the core flow:

1. Add a job application
2. Save it in the database
3. View all applications
4. Update the application status
5. Add tags or notes

Once this is working, I can improve the database design and add more advanced features. I believe this is a solid plan so far.