from django.contrib import admin
from .models import (
    Profile,
    Contact,
    OtherContact,
    EducationalBackground,
    Skill,
    WorkExperience,
    Project,
    Award,
)


class ContactInline(admin.TabularInline):
    model = Contact
    extra = 2


class OtherContactInline(admin.TabularInline):
    model = OtherContact
    extra = 2


class ProfileInfoAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {"fields": ["user", "user_photo", "profession", "about"]},),
    ]
    inlines = [ContactInline, OtherContactInline]
    list_display = ("user", "user_photo", "profession", "about")
    search_fields = ["profession"]


class EducAdmin(admin.ModelAdmin):
    list_display = (
        "school_name",
        "school_duration",
        "school_type",
        "school_description",
    )


class SkillAdmin(admin.ModelAdmin):
    list_display = ("skill", "skill_details", "skill_photo")


class WorkExperienceAdmin(admin.ModelAdmin):
    list_display = ("job_title", "work_description", "location", "inclusive_dates")


class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        "project_title",
        "project_description",
        "project_photo",
        "date_added",
    )


class AwardAdmin(admin.ModelAdmin):
    list_display = ("award_title", "award_detail", "award_date")


admin.site.register(Profile, ProfileInfoAdmin)
admin.site.register(EducationalBackground, EducAdmin)
admin.site.register(Skill, SkillAdmin)
admin.site.register(WorkExperience, WorkExperienceAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Award, AwardAdmin)
