using Talent.Common.Contracts;
using Talent.Common.Models;
using Talent.Services.Profile.Domain.Contracts;
using Talent.Services.Profile.Models.Profile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;
using Talent.Services.Profile.Models;
using Microsoft.AspNetCore.Http;
using System.IO;
using Talent.Common.Security;

namespace Talent.Services.Profile.Domain.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IUserAppContext _userAppContext;
        IRepository<UserLanguage> _userLanguageRepository;
        IRepository<UserSkill> _userSkillRepository; //MOS24072021 added for standard task module 1
        IRepository<UserExperience> _userExperienceRepository; //MOS24072021 added for standard task module 1
        IRepository<User> _userRepository;
        IRepository<Employer> _employerRepository;
        IRepository<Job> _jobRepository;
        IRepository<Recruiter> _recruiterRepository;
        IFileService _fileService;


        public ProfileService(IUserAppContext userAppContext,
                              IRepository<UserLanguage> userLanguageRepository,
                              IRepository<UserSkill> userSkillRepository,    //MOS24072021 added for standard task module 1
                              IRepository<UserExperience> userExperienceRepository,    //MOS24072021 added for standard task module 1
                              IRepository<User> userRepository,
                              IRepository<Employer> employerRepository,
                              IRepository<Job> jobRepository,
                              IRepository<Recruiter> recruiterRepository,
                              IFileService fileService)
        {
            _userAppContext = userAppContext;
            _userLanguageRepository = userLanguageRepository;
            _userSkillRepository = userSkillRepository;    //MOS24072021 added for standard task module 1
            _userExperienceRepository = userExperienceRepository;    //MOS24072021 added for standard task module 1
            _userRepository = userRepository;
            _employerRepository = employerRepository;
            _jobRepository = jobRepository;
            _recruiterRepository = recruiterRepository;
            _fileService = fileService;
        }

        //MOS22072021 added for standard task Module 1
        //added methods for the maintenance of UserLanguage records
        //AddLanguage
        //GetLanguageByIDAsync
        //DeleteLanguageByIdAsync
        //UpdateLanguage
        public async Task<string> AddLanguage(UserLanguage language)
        {
            var objectId = ObjectId.GenerateNewId().ToString();

            var newUserLanguage = new UserLanguage()
            {
                Id = objectId,
                IsDeleted = false,
                UserId = language.UserId,
                Language = language.Language,
                LanguageLevel = language.LanguageLevel
            };

            await _userLanguageRepository.Add(newUserLanguage);
            return newUserLanguage.Id;

        }

        public async Task<UserLanguage> GetLanguageByIDAsync(string id)
        {
            return await _userLanguageRepository.GetByIdAsync(id);
        }

        public async Task DeleteLanguageByIdAsync(string languageId)
        {
            var language = await GetLanguageByIDAsync(languageId);
            language.IsDeleted = true;
            await _userLanguageRepository.Update(language);
        }

        public async Task<bool> UpdateLanguage(UserLanguage language)
        {
            try
            {
                if (language.Id != null)
                {
                    UserLanguage existingLanguage = await GetLanguageByIDAsync(language.Id);
                    existingLanguage.Language = language.Language;
                    existingLanguage.LanguageLevel = language.LanguageLevel;
                    await _userLanguageRepository.Update(existingLanguage);
                    return true;
                }
                return false;
            }
            catch (MongoException e)
            {
                return false;
            }
        }

        public bool AddNewLanguage(AddLanguageViewModel language)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        //MOS22072021 added for standard task Module 1
        //added methods for the maintenance of UserSkill records
        //AddSkill
        //UpdateSkill
        //DeleteSkill
        public async Task<string> AddSkill(UserSkill skill)
        {
            var objectId = ObjectId.GenerateNewId().ToString();

            var newUserSkill = new UserSkill()
            {
                Id = objectId,
                IsDeleted = false,
                UserId = skill.UserId,
                Skill = skill.Skill,
                ExperienceLevel = skill.ExperienceLevel
            };

            await _userSkillRepository.Add(newUserSkill);
            return newUserSkill.Id;

        }

        public async Task<bool> UpdateSkill(UserSkill skill)
        {
            try
            {
                if (skill.Id != null)
                {
                    UserSkill existingSkill = await _userSkillRepository.GetByIdAsync(skill.Id);
                    existingSkill.Skill = skill.Skill;
                    existingSkill.ExperienceLevel = skill.ExperienceLevel;
                    await _userSkillRepository.Update(existingSkill);
                    return true;
                }
                return false;
            }
            catch (MongoException e)
            {
                return false;
            }
        }

        public async Task DeleteSkill(string skillId)
        {
            var skill = await _userSkillRepository.GetByIdAsync(skillId);
            skill.IsDeleted = true;
            await _userSkillRepository.Update(skill);
        }

        //MOS27072021 added for standard task Module 1
        public async Task<string> AddExperience(UserExperience experience)
        {
            var objectId = ObjectId.GenerateNewId().ToString();

            var newUserExperience = new UserExperience()
            {
                Id = objectId,
                IsDeleted = false,
                UserId = experience.UserId,
                Company = experience.Company,
                Position = experience.Position,
                Responsibilities = experience.Responsibilities,
                Start = experience.Start,
                End = experience.End
            };

            await _userExperienceRepository.Add(newUserExperience);
            return newUserExperience.Id;

        }

        public async Task<bool> UpdateExperience(UserExperience experience)
        {
            try
            {
                if (experience.Id != null)
                {
                    UserExperience existingExperience = await _userExperienceRepository.GetByIdAsync(experience.Id);
                    existingExperience.Company = experience.Company;
                    existingExperience.Position = experience.Position;
                    existingExperience.Responsibilities = experience.Responsibilities;
                    existingExperience.Start = experience.Start;
                    existingExperience.End = experience.End;
                    await _userExperienceRepository.Update(existingExperience);
                    return true;
                }
                return false;
            }
            catch (MongoException e)
            {
                return false;
            }
        }

        //MOS25072021 added for advanced task module 1
        public async Task DeleteExperience(string experienceId)
        {
            var experience = await _userExperienceRepository.GetByIdAsync(experienceId);
            experience.IsDeleted = true;
            await _userExperienceRepository.Update(experience);
        }

        public async Task<TalentProfileViewModel> GetTalentProfile(string Id)
        {
            //MOS21072921 added for standard task module 1
            User profile = null;
            profile = (await _userRepository.GetByIdAsync(Id));
            if (profile != null)
            {
                var languages = await _userLanguageRepository.Get(x => x.UserId == profile.Id && !x.IsDeleted);
                var currentUserLanguages = languages.Select(x => ViewModelFromLanguage(x)).ToList();

                var skills = await _userSkillRepository.Get(x => x.UserId == profile.Id && !x.IsDeleted);
                var currentUserSkills = skills.Select(x => ViewModelFromSkill(x)).ToList();

                var experiences = await _userExperienceRepository.Get(x => x.UserId == profile.Id && !x.IsDeleted);
                var currentUserExperiences = experiences.Select(x => ExperienceViewModel(x)).ToList();

                profile.ProfilePhotoUrl = string.IsNullOrWhiteSpace(profile.ProfilePhoto)
                          ? ""
                          : await _fileService.GetFileURL(profile.ProfilePhoto, FileType.ProfilePhoto);

                var result = new TalentProfileViewModel
                {
                    Id = profile.Id,
                    FirstName = profile.FirstName,
                    MiddleName = profile.MiddleName,
                    LastName = profile.LastName,
                    Gender = profile.Gender,
                    Email = profile.Email,
                    Phone = profile.Phone,
                    MobilePhone = profile.MobilePhone,
                    IsMobilePhoneVerified = profile.IsMobilePhoneVerified,
                    Address = profile.Address,
                    Nationality = profile.Nationality,
                    VisaStatus = profile.VisaStatus,
                    VisaExpiryDate = profile.VisaExpiryDate,
                    ProfilePhoto = profile.ProfilePhoto,
                    ProfilePhotoUrl = profile.ProfilePhotoUrl,
                    VideoName = profile.VideoName,
                    //VideoUrl = profile.videoUrl,
                    CvName = profile.CvName,
                    //CvUrl = profile.CvUrl,
                    Summary = profile.Summary,
                    Description = profile.Description,
                    LinkedAccounts = profile.LinkedAccounts,
                    JobSeekingStatus = profile.JobSeekingStatus,
                    Languages = currentUserLanguages,
                    Skills = currentUserSkills,
                    //Education = currentUserEducation,
                    //Certifications = currentUserCertification,
                    Experience = currentUserExperiences
                };
                return result;
            }

            //Your code here;
            //MOS21072921 replaced for standard task module 1
            //throw new NotImplementedException();
            return null;
        }

        public async Task<bool> UpdateTalentProfile(TalentProfileViewModel user, string updaterId)
        {
            //MOS21072921 added for standard task module 1
            try
            {
                if (user.Id != null)
                {
                    User existingTalent = (await _userRepository.GetByIdAsync(user.Id));
                    existingTalent.FirstName = user.FirstName;
                    existingTalent.MiddleName = user.MiddleName;
                    existingTalent.LastName = user.LastName;
                    existingTalent.Gender = user.Gender;
                    existingTalent.Email = user.Email;
                    existingTalent.Phone = user.Phone;
                    existingTalent.MobilePhone = user.MobilePhone;
                    existingTalent.IsMobilePhoneVerified = user.IsMobilePhoneVerified;
                    existingTalent.Address = user.Address;
                    existingTalent.Nationality = user.Nationality;
                    existingTalent.VisaStatus = user.VisaStatus;
                    existingTalent.VisaExpiryDate = user.VisaExpiryDate;
                    existingTalent.ProfilePhoto = user.ProfilePhoto;
                    existingTalent.ProfilePhotoUrl = user.ProfilePhotoUrl;
                    existingTalent.VideoName = user.VideoName;
                    //VideoUrl = profile.videoUrl,
                    existingTalent.CvName = user.CvName;
                    //CvUrl = profile.CvUrl,
                    existingTalent.Summary = user.Summary;
                    existingTalent.Description = user.Description;
                    existingTalent.LinkedAccounts = user.LinkedAccounts;
                    existingTalent.JobSeekingStatus = user.JobSeekingStatus;

                    //Education = profile.Education,
                    //Certifications = profile.Certifications,
                    //Experience = profile.Experience,

                    await _userRepository.Update(existingTalent);
                    return true;
                }
                return false;
            }
            catch (MongoException e)
            {
                return false;
            }
            //Your code here;
            //throw new NotImplementedException();
        }

        public async Task<EmployerProfileViewModel> GetEmployerProfile(string Id, string role)
        {

            Employer profile = null;
            switch (role)
            {
                case "employer":
                    profile = (await _employerRepository.GetByIdAsync(Id));
                    break;
                case "recruiter":
                    profile = (await _recruiterRepository.GetByIdAsync(Id));
                    break;
            }

            var videoUrl = "";

            if (profile != null)
            {
                videoUrl = string.IsNullOrWhiteSpace(profile.VideoName)
                          ? ""
                          : await _fileService.GetFileURL(profile.VideoName, FileType.UserVideo);

                var skills = profile.Skills.Select(x => ViewModelFromSkill(x)).ToList();

                var result = new EmployerProfileViewModel
                {
                    Id = profile.Id,
                    CompanyContact = profile.CompanyContact,
                    PrimaryContact = profile.PrimaryContact,
                    Skills = skills,
                    ProfilePhoto = profile.ProfilePhoto,
                    ProfilePhotoUrl = profile.ProfilePhotoUrl,
                    VideoName = profile.VideoName,
                    VideoUrl = videoUrl,
                    DisplayProfile = profile.DisplayProfile,
                };
                return result;
            }

            return null;
        }

        public async Task<bool> UpdateEmployerProfile(EmployerProfileViewModel employer, string updaterId, string role)
        {
            try
            {
                if (employer.Id != null)
                {
                    switch (role)
                    {
                        case "employer":
                            Employer existingEmployer = (await _employerRepository.GetByIdAsync(employer.Id));
                            existingEmployer.CompanyContact = employer.CompanyContact;
                            existingEmployer.PrimaryContact = employer.PrimaryContact;
                            existingEmployer.ProfilePhoto = employer.ProfilePhoto;
                            existingEmployer.ProfilePhotoUrl = employer.ProfilePhotoUrl;
                            existingEmployer.DisplayProfile = employer.DisplayProfile;
                            existingEmployer.UpdatedBy = updaterId;
                            existingEmployer.UpdatedOn = DateTime.Now;

                            var newSkills = new List<UserSkill>();
                            foreach (var item in employer.Skills)
                            {
                                var skill = existingEmployer.Skills.SingleOrDefault(x => x.Id == item.Id);
                                if (skill == null)
                                {
                                    skill = new UserSkill
                                    {
                                        Id = ObjectId.GenerateNewId().ToString(),
                                        IsDeleted = false
                                    };
                                }
                                UpdateSkillFromView(item, skill);
                                newSkills.Add(skill);
                            }
                            existingEmployer.Skills = newSkills;

                            await _employerRepository.Update(existingEmployer);
                            break;

                        case "recruiter":
                            Recruiter existingRecruiter = (await _recruiterRepository.GetByIdAsync(employer.Id));
                            existingRecruiter.CompanyContact = employer.CompanyContact;
                            existingRecruiter.PrimaryContact = employer.PrimaryContact;
                            existingRecruiter.ProfilePhoto = employer.ProfilePhoto;
                            existingRecruiter.ProfilePhotoUrl = employer.ProfilePhotoUrl;
                            existingRecruiter.DisplayProfile = employer.DisplayProfile;
                            existingRecruiter.UpdatedBy = updaterId;
                            existingRecruiter.UpdatedOn = DateTime.Now;

                            var newRSkills = new List<UserSkill>();
                            foreach (var item in employer.Skills)
                            {
                                var skill = existingRecruiter.Skills.SingleOrDefault(x => x.Id == item.Id);
                                if (skill == null)
                                {
                                    skill = new UserSkill
                                    {
                                        Id = ObjectId.GenerateNewId().ToString(),
                                        IsDeleted = false
                                    };
                                }
                                UpdateSkillFromView(item, skill);
                                newRSkills.Add(skill);
                            }
                            existingRecruiter.Skills = newRSkills;
                            await _recruiterRepository.Update(existingRecruiter);

                            break;
                    }
                    return true;
                }
                return false;
            }
            catch (MongoException e)
            {
                return false;
            }
        }

        public async Task<bool> UpdateEmployerPhoto(string employerId, IFormFile file)
        {
            var fileExtension = Path.GetExtension(file.FileName);
            List<string> acceptedExtensions = new List<string> { ".jpg", ".png", ".gif", ".jpeg" };

            if (fileExtension != null && !acceptedExtensions.Contains(fileExtension.ToLower()))
            {
                return false;
            }

            var profile = (await _employerRepository.Get(x => x.Id == employerId)).SingleOrDefault();

            if (profile == null)
            {
                return false;
            }

            var newFileName = await _fileService.SaveFile(file, FileType.ProfilePhoto);

            if (!string.IsNullOrWhiteSpace(newFileName))
            {
                var oldFileName = profile.ProfilePhoto;

                if (!string.IsNullOrWhiteSpace(oldFileName))
                {
                    await _fileService.DeleteFile(oldFileName, FileType.ProfilePhoto);
                }

                profile.ProfilePhoto = newFileName;
                profile.ProfilePhotoUrl = await _fileService.GetFileURL(newFileName, FileType.ProfilePhoto);

                await _employerRepository.Update(profile);
                return true;
            }

            return false;

        }

        public async Task<bool> AddEmployerVideo(string employerId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<TalentProfileViewModel> UpdateTalentPhoto(string talentId, IFormFile file)
        {
            //MOS29072021 added for Standard task module 1
            var fileExtension = Path.GetExtension(file.FileName);
            List<string> acceptedExtensions = new List<string> { ".jpg", ".png", ".gif", ".jpeg" };

            if (fileExtension != null && !acceptedExtensions.Contains(fileExtension.ToLower()))
            {
                return null;
            }

            var profile = (await _userRepository.Get(x => x.Id == talentId)).SingleOrDefault();

            if (profile == null)
            {
                return null;
            }

            var newFileName = await _fileService.SaveFile(file, FileType.ProfilePhoto);

            if (!string.IsNullOrWhiteSpace(newFileName))
            {
                var oldFileName = profile.ProfilePhoto;

                if (!string.IsNullOrWhiteSpace(oldFileName))
                {
                    await _fileService.DeleteFile(oldFileName, FileType.ProfilePhoto);
                }

                profile.ProfilePhoto = newFileName;

                var photoUrl = await _fileService.GetFileURL(newFileName, FileType.ProfilePhoto);

                if (photoUrl == null)
                {
                    return null;
                }

                profile.ProfilePhotoUrl = photoUrl;

                await _userRepository.Update(profile);

                var result = new TalentProfileViewModel
                {
                    ProfilePhoto = profile.ProfilePhoto,
                    ProfilePhotoUrl = profile.ProfilePhotoUrl
                };

                return result;

            }

            return null;
            //Your code here;
            //throw new NotImplementedException();
        }

        public async Task<bool> AddTalentVideo(string talentId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();

        }

        public async Task<bool> RemoveTalentVideo(string talentId, string videoName)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateTalentCV(string talentId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<string>> GetTalentSuggestionIds(string employerOrJobId, bool forJob, int position, int increment)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(string employerOrJobId, bool forJob, int position, int increment)
        {
            //MOS03082021 added for standard task module 2
            IEnumerable<User> users = (await _userRepository.Get(x => !x.IsDeleted)).Skip(position * increment).Take(increment);

            List<TalentSnapshotViewModel> result = new List<TalentSnapshotViewModel>();

            foreach (var user in users)
            {
                String name = String.Format("{0} {1}", user.FirstName, user.LastName);
                List<string> skills = user.Skills.Select(x => x.Skill).ToList();
                //string photo = await _documentService.GetFileURL(user.ProfilePhoto, FileType.ProfilePhoto);

                UserExperience latest = user.Experience.OrderByDescending(x => x.End).FirstOrDefault();
                String level, employment;
                if (latest != null)
                {
                    level = latest.Position;
                    employment = latest.Company;
                }
                else
                {
                    level = "Unknown";
                    employment = "Unknown";
                }

                var talentSnapshot = new TalentSnapshotViewModel
                {
                    CurrentEmployment = employment,
                    Id = user.Id,
                    Level = level,
                    Name = name,
                    PhotoId = user.ProfilePhotoUrl,
                    Skills = skills,
                    Summary = user.Summary,
                    Visa = user.VisaStatus,
                    LinkedIn = user.LinkedAccounts.LinkedIn,
                    Github = user.LinkedAccounts.Github,
                };

                result.Add(talentSnapshot);
            }

            return result;
            //Your code here;
            //throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(IEnumerable<string> ids)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        #region TalentMatching

        public async Task<IEnumerable<TalentSuggestionViewModel>> GetFullTalentList()
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public IEnumerable<TalentMatchingEmployerViewModel> GetEmployerList()
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentMatchingEmployerViewModel>> GetEmployerListByFilterAsync(SearchCompanyModel model)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSuggestionViewModel>> GetTalentListByFilterAsync(SearchTalentModel model)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSuggestion>> GetSuggestionList(string employerOrJobId, bool forJob, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> AddTalentSuggestions(AddTalentSuggestionList selectedTalents)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        #endregion

        #region Conversion Methods

        #region Update from View

        protected void UpdateSkillFromView(AddSkillViewModel model, UserSkill original)
        {
            original.ExperienceLevel = model.Level;
            original.Skill = model.Name;
        }

        //MOS24072021 added for strandard task module 1
        protected AddLanguageViewModel ViewModelFromLanguage(UserLanguage language)
        {
            return new AddLanguageViewModel
            {
                Id = language.Id,
                Level = language.LanguageLevel,
                Name = language.Language
            };
        }

        //MOS27072021 added for strandard task module 1
        protected ExperienceViewModel ExperienceViewModel(UserExperience experience)
        {
            return new ExperienceViewModel
            {

                Id = experience.Id,
                Company = experience.Company,
                Position = experience.Position,
                Responsibilities = experience.Responsibilities,
                Start = experience.Start,
                End = experience.End
            };
        }
        #endregion

        #region Build Views from Model

        protected AddSkillViewModel ViewModelFromSkill(UserSkill skill)
        {
            return new AddSkillViewModel
            {
                Id = skill.Id,
                Level = skill.ExperienceLevel,
                Name = skill.Skill
            };
        }

        #endregion

        #endregion

        #region ManageClients

        public async Task<IEnumerable<ClientViewModel>> GetClientListAsync(string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<ClientViewModel> ConvertToClientsViewAsync(Client client, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }
         
        public async Task<int> GetTotalTalentsForClient(string clientId, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();

        }

        public async Task<Employer> GetEmployer(string employerId)
        {
            return await _employerRepository.GetByIdAsync(employerId);
        }
        #endregion

    }
}
