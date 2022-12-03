<%@ tag pageEncoding="UTF-8"
    display-name="data-organization"
    body-content="empty"
    trimDirectiveWhitespaces="true"
    description="Generates schema.org data for organizations." %>


<%@ attribute name="content" type="org.opencms.jsp.util.CmsJspContentAccessBean" required="true"
    description="The XML content to use for data generation."%>

<%@ attribute name="addressJsonLd" type="java.lang.Object" required="false"
    description="Address location data as given by the location-vars.tag.
    If not provided this will be read from the given content object." %>

<%@ attribute name="showAddress" type="java.lang.Boolean" required="false"
    description="Include the organization address in the output." %>

<%@ attribute name="showPerson" type="java.lang.Boolean" required="false"
    description="Include the employee information in the output." %>

<%@ attribute name="persContent" type="org.opencms.jsp.util.CmsJspContentAccessBean" required="false"
    description="A content access bean of type m-person.
    If provided the 'employee' information will be generated from this content.
    Otherwise the 'employee' information will be generated from the 'LinkToManager' relation of the organization content." %>

<%@ attribute name="storeOrgJsonLdObject" type="java.lang.Boolean" required="false"
    description="Controls if a JSON-LD object is created for the organization and stored in the variable 'orgJsonLd'.
    If this is set to 'true', no output is written, only the object is generated and stored in the variable.
    Default is 'false' if not provided." %>

<%@ variable name-given="orgJsonLd" scope="AT_END" declare="true" variable-class="org.opencms.jsp.util.CmsJspJsonWrapper"
    description="A JSON-LD object created for the organization.
    This will only be created if the attribute 'storeOrgJsonLdObject' has been set to 'true'." %>


<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="mercury" tagdir="/WEB-INF/tags/mercury" %>


<c:set var="value"                  value="${content.value}" />
<c:set var="contact"                value="${content.value.Contact.value}" />

<c:choose>
    <c:when test="${content.typeName eq 'm-contact'}">
        <c:set var="strWebsiteUrl"  value="${contact.Website.isSet ? contact.Website.toLink : null}" />
    </c:when>
    <c:otherwise>
        <c:set var="strWebsiteUrl"  value="${contact.Website.value.URI.isSet ? contact.Website.value.URI.toLink : null}" />
    </c:otherwise>
</c:choose>
<c:if test="${not empty strWebsiteUrl and fn:startsWith(strWebsiteUrl, '/')}">
    <c:set var="strWebsiteUrl"      value="${cms.site.url}${strWebsiteUrl}" />
</c:if>

<c:set var="strImageUrl"            value="${value.Image.value.Image.isSet ? value.Image.value.Image.toImage.srcUrl : null}" />
<c:if test="${not empty strImageUrl and fn:startsWith(strImageUrl, '/')}">
    <c:set var="strImageUrl"        value="${cms.site.url}${strImageUrl}" />
</c:if>

<c:if test="${showPerson and (value.LinkToManager.isSet or not empty persContent)}">
    <c:set var="persContent" value="${empty persContent ? cms.vfs.readXml[value.LinkToManager] : persContent}" />
    <mercury:data-person content="${persContent}" storePersJsonLdObject="${true}" showAddress="${false}" showOrganization="${false}" />
</c:if>

<%--
# JSON-LD generation for Mercury organization.
# See: https://schema.org/Organization
--%>
<cms:jsonobject var="jsonLd">
    <c:if test="${not storeOrgJsonLdObject}">
        <cms:jsonvalue key="@context"   value="https://schema.org" />
    </c:if>
    <cms:jsonvalue key="@type"          value="Organization" />

    <cms:jsonvalue key="name"           value="${content.value.Organization.toString}" />

    <cms:jsonvalue key="telephone"      value="${contact.Phone.isSet ? contact.Phone.toString : (contact.Mobile.isSet ? contact.Mobile.toString : null)}" />
    <cms:jsonvalue key="faxNumber"      value="${contact.Fax.isSet ? contact.Fax.toString : null}" />

    <cms:jsonvalue key="email"          value="${contact.Email.value.Email.isSet and not contact.Email.value.ObfuscateEmail.toBoolean ? contact.Email.value.Email.toString : null}" />

    <cms:jsonvalue key="url"            value="${strWebsiteUrl}" />
    <cms:jsonvalue key="image"          value="${strImageUrl}" />

    <c:if test="${showAddress}">
         <%-- Do not include address here. Reason: This will be called from data-person where the address is already included. --%>
        <mercury:location-vars data="${contact.AddressChoice}" addMapInfo="${true}" createJsonLd="${true}" test="${empty addressJsonLd}" >
            <cms:jsonvalue key="address" value="${empty addressJsonLd ? adrJsonLd : addressJsonLd}" />
        </mercury:location-vars>
    </c:if>

    <c:if test="${showPerson and not empty persJsonLd}">
        <cms:jsonvalue key="employee" value="${persJsonLd}" />
    </c:if>

</cms:jsonobject>

<c:choose>
    <c:when test="${storeOrgJsonLdObject}">
        <c:set var="orgJsonLd" value="${jsonLd}" />
    </c:when>
    <c:otherwise>
        <script type="application/ld+json"><%----%>
            ${cms.isOnlineProject ? jsonLd.compact : jsonLd.pretty}
        </script><%----%>
    </c:otherwise>
</c:choose>

